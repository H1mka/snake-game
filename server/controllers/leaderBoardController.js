const db = require('../db');

class LeaderBoardController {
    async createLeader(req, res) {
        try {
            const { player_name, player_score } = req.body;

            const findLeader = await db.query('SELECT * FROM leader_board WHERE player_name = $1', [
                player_name,
            ]);

            // Якщо такого гравця ще не існує, додаю гравця
            if (!findLeader.rowCount) {
                const newLeader = await db.query(
                    `INSERT INTO leader_board (player_name, player_score) values ($1, $2) RETURNING *`,
                    [player_name, player_score]
                );

                res.status(200).json(newLeader.rows);
                return;
            }

            // Якщо вже існуючий гравець побив минулий рекорд
            if (player_score > findLeader.rows[0].player_score) {
                const updatePlayerScore = await db.query(
                    'UPDATE leader_board SET player_score = $1 WHERE player_name = $2 RETURNING *',
                    [player_score, player_name]
                );

                res.status(200).json(updatePlayerScore.rows);
                return;
            }

            // Якщо новий рекорд нижче попереднього
            res.status(200).json('New record lower than previous record');
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
