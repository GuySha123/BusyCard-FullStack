export function generateCode() {
    const possibleCharacters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 20; i++) {
        code += possibleCharacters.charAt(
            Math.floor(Math.random() * possibleCharacters.length)
        );
    }
    return code;
}
