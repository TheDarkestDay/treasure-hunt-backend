export const getRandomNumber = (min: number, max: number): number => {
    return Math.round(Math.random() * (max - min - 1) + min);
}; 