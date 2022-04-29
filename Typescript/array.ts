//Array
let members:string[] = ['이권', '감장겸', '장도일'];

console.log("members : ", members)
//제네릭 배열 타입
let num: Array<number> = [1, 2, 3];

console.log("num : ", num)
//Tuple
let x: [string, number];
// 초기화
x = ["hello", 10]; // 성공
// 잘못된 초기화
//x = [10, "hello"]; // 오류

console.log(x[0].substring(1)); // 성공
//console.log(x[1].substring(1)); // 오류, 'number'에는 'substring' 이 없습니다.
//x[3] = "world"; // 오류, '[string, number]' 타입에는 프로퍼티 '3'이 없습니다.

//console.log(x[5].toString()); // '[string, number]' 타입에는 프로퍼티 '5'가 없습니다.

//Enum
//enum Color {Red, Green, Blue}
//let c: Color = Color.Green;

//enum Color {Red = 1, Green = 2, Blue = 4}  //수동으로 값 설정 가능 (기본은 0부터 번호 매기는 것)

enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName); // 값이 2인 'Green'이 출력됩니다

//Any  알지 못하는 타입 표현 시 사용
let notSure: any = 4;
notSure = "maybe a string instead";  //string로 지정
notSure = false; // boolean으로 지정

//다른 타입이 섞인 배열 다룰 수 있음
let list: any[] = [1, true, "free"];

list[1] = 100
console.log(list)
