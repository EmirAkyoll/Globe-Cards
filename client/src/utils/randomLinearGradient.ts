import { randomColor } from "./randomColor";

export function randomLinearGradient() {
    const color1 = randomColor()
    const color2 = randomColor()
    const color3 = randomColor()

    const colors = [color1, color2, color3];
    const numberOfColorsToCombine = Math.floor(Math.random() * 2) + 2; 
    const selectedColors = colors.slice(0, numberOfColorsToCombine);
    return `${selectedColors}`;
}