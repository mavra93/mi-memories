export function getRandomHour() {
    const maxNumber = 24;
    let randNum = Math.floor(Math.random() * maxNumber);
    if (randNum % 2 === 0) {
        if (randNum === maxNumber) {
            randNum = randNum - 1;
        } else {
            randNum = randNum + 1;
        }
    }
    return randNum;
}