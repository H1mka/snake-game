import { gameSettings } from '../constants/gameSettings';

const getTypeForFood = () => {
    let foodType = { foodType: 'smFood', cost: 1 };

    const typeNum = Math.floor(Math.random() * 3) + 1;
    switch (typeNum) {
        case 2:
            foodType = { foodType: 'mdFood', cost: 5 };
            break;
        case 3:
            foodType = { foodType: 'lgFood', cost: 10 };
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

    return { ...foodType, pos: foodPos };
};

export { randomFood };
