
export function generateRoomCode () {
    const randomNum = Math.random() * 9999;
    const formattedRandomNum = Math.floor(randomNum).toString();
    return formattedRandomNum.padStart(4, '0')
}