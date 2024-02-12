export function formatNumber(num: number) {
    let strNumber = String(num).split('').reverse().join('');
    strNumber = strNumber.replace(/(\d{3})(?=\d)/g, '$1.');
    return strNumber.split('').reverse().join('').replace(/^\.|\.($|\.)/g, '');
}