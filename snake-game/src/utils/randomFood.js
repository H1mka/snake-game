import { gameSettings } from '../constants/gameSettings';

const getTypeForFood = () => {
    const typeNum = Math.floor(Math.random() * 3) + 1;

    const foodTypeMap = {
        1: { foodType: 'smFood', cost: 1 },
        2: { foodType: 'mdFood', cost: 5 },
        3: { foodType: 'lgFood', cost: 10 },
    };

    return foodTypeMap[typeNum];
};

const randomFood = (snake) => {
    const exclusions = snake.map((cell) => cell.pos);
    let foodPos = 1;

    do {
        foodPos = Math.floor(Math.random() * gameSettings.boardSize ** 2) + 1;
    } while (exclusions.includes(foodPos));

    let foodType = getTypeForFood();

    return { ...foodType, pos: foodPos };
};

export { randomFood };
