
function randomHex() {
    return `${Math.floor(Math.random() * 255)}`.toString(16);
}
function randomColor() {
    return `0x${randomHex()}${randomHex()}${randomHex()}`
}

export {
    randomColor
}