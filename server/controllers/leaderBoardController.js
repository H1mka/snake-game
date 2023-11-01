const db = require('../db');

class LeaderBoardController {
    async createLeader(req, res) {
        try {
            const { player_name, player_score } = req.body;

            const newLeader = await db.query(
                `INSERT INTO leader_board (player_name, player_score) values ($1, $2) RETURNING *`,
                [player_name, player_score]
            );

            res.status(200).json(newLeader.rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getAllLeaders(req, res) {
        try {
            const leaders = await db.query('SELECT * from leader_board');
            const sortedLeaders = leaders.rows.sort((a, b) => b.player_score - a.player_score);

            res.status(200).json(sortedLeaders);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new LeaderBoardController();
