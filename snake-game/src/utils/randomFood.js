import { gameSettings } from '../constants/gameSettings';

const getTypeForFood = () => {
    let foodType = 'smFood';

    const typeNum = Math.floor(Math.random() * 3) + 1;
    switch (typeNum) {
        case 2:
            foodType = 'mdFood';
            break;
        case 3:
            foodType = 'lgFood';
            break;
        default:
            break;
    }
    return foodType;
};

const randomFood = (snake) => {
    const exclusions = snake.map((cell) => cell.pos);
    let max = gameSettings.boardSize ** 2;
    let foodPos = 1;
    do {
        foodPos = Math.floor(Math.random() * max) + 1;
    } while (exclusions.includes(foodPos));

    let foodType = getTypeForFood();

    return {
        foodType,
        pos: foodPos,
    };
};

export { randomFood };
