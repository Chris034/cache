const usernames = [
    'Polar Bear',
    'Blue Whale',
    'Hippopotamus',
    'King Cobra',
    'Flamingo',
    'Hermit Crab',
    'Flying Squirrel',
    'Jellyfish',
    'Chimpanzee',
    'Porcupine',
    'Armadillo',
    'Meerkat',
    'Anaconda',
    'Butterfly',
    'Emperor Penguin',
    'Ladybug',
    'Red Panda',
    'Scorpion',
    'Yellowfin Tuna',
    'Water Buffalo',
    'Pit Viper',
    'Guinea Pig',
    'Firefly',
    'Dolphin',
    'Chameleon',
    'Hummingbird',
    'Alpaca',
    'Orangutan',
    'Salamander',
    'Aardvark'
];

const colors = [
    '#89cfd3',
    '#eaa8a8',
    '#dcbcd8',
    '#abcba5',
    '#7e8cea',
    '#eaba6a',
    '#d7d15f',
    '#d2d2d2',
    '#f4b4dc',
    '#bf81dc'
];

const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
    }
    return Math.abs(hash) % colors.length;
};

export const generateColorByUser = (username: string) => {
    const index = hashCode(username);
    return colors[index];
};

export function generateColorRandom(): string {
    return colors[Math.floor(Math.random() * colors.length)];
}

export function generateUserName(): string {
    return usernames[Math.floor(Math.random() * usernames.length)];
}
