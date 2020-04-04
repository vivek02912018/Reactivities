export interface ICar {
    color: string;
    model: string;
    topSpeed?: number;
}

const car1: ICar = {
    color: 'blue',
    model:'BMW'
}
const car2: ICar = {
    color: 'red',
    model: 'mercedes',
    topSpeed:100
}
export const numbers = [1, 2, 3, 4, 5];
//const doubled = numbers.map((number) => number * 2);
//console.log(doubled);
export const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
  ];
export const cars = { car1, car2 };