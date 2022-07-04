interface User {
  name: string;
  id: number;
}
 
class UserAccount {
  name: string;
  id: number;
 
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
 
const user: User = new UserAccount("Murphy", 1);

//can use interfaces for returning values to function
function getAdminUser(): User {
  //...
}
 
function deleteUser(user: User) {
  // ...
}

//primitive types : boolean, bigint, null, number, string, symbol, undefined,,(js) 
//                any, unknown(ensure someone using this type declare what type is), never, void(a funciton which returns defined or has no return value)


//you can make a function return different values depending on whether it is passed a string or an array
function wrapInArray(obj: string | string[]) {
  if (typeof obj === "string") {
    return [obj];
            
(parameter) obj: string
  }
  return obj;
}

//TypeScript compares the shape of point to the shape of Point in the type-check
//This is called “duck typing” or “structural typing”.
interface Point {
  x: number;
  y: number;
}
 
function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
 
// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);



class VirtualPoint {
  x: number;
  y: number;
 
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
 
const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // logs "13, 56"
