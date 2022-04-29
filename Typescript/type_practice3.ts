//Void(any 반대 어떤 타입도 존재할 수 없음)
function warnUser(): void {
    console.log("This is my warning message");
}
warnUser();

//Null and Undefined
//각각 자신의 타입 이름으로 undefined, null 사용
let u: undefined = undefined;
let n: null = null;

//Never 절대 발생할 수 없는 타입
// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function error(message: string): never {
    throw new Error(message);
}

// 반환 타입이 never로 추론된다.
function fail() {
    return error("Something failed");
}

// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function infiniteLoop(): never {
    while (true) {
    }
}

//Object number, string, boolean, bigint, symbol, null, undefined가 아닌 나머지
function create(o: object | null): void{};

create({ prop: 0 }); // 성공
create(null); // 성공
//create(42); // 오류
//create("string"); // 오류
//create(false); // 오류
//create(undefined); // 오류

//함수
//기명 함수
function add(x, y) {
    return x + y;
}

// 익명 함수
//let myAdd = function(x, y) { return x + y };

let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };

//다수의 매개변수 입력시 (...)
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
