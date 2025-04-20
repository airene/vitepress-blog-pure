---
title: TypeScript学习笔记
description: typescript学习笔记
date: 2021-09-03
tags:
  - typescript
---

## tips

- 传递数组或者对象作为函数参数时，可以用 Readonly<> 包裹原来的类型声明，譬如 `Readonly<Array<number>>`，TypeScript 编译器会通过拒绝编译来保护这个参数不被修改。如果的确需要一个可以被修改的数组，可以通过 spread 操作 [...array] 来复制这个数组
  - ```ts
    function sortNumbers(array: Readonly<Array<number>>) {
      return [...array].sort((a, b) => a - b);
    }
    ```
- 使用 unkown 而不是 any 来标注类型尚未明确的变量。Any 告诉 TypeScript 编译器，不需要检查类型；而 unkown 则是把检查留到使用变量的时候。使用时可以通过 typeof 运算符获取到变量的实际类型，通过 as 添加上类型后就可以正常使用了
- 使用 Records 来代替 Objects，因为可以限定键的范围。如

  ```ts
  type AllowedKeys = "name" | "age";

  // use a type here instead of interface
  type Person = Record<AllowedKeys, unknown>;

  const Human: Person = {
    name: "Steve",
    age: 42,
  };
  ```

## tsconfig

### 隐式推断

ts 有隐式类型推断。开启后隐式 any 的推断会被检查并报错。

```typescript
// x被隐式推断成any,抛出错误
function getNum(x) {
  return x;
}
// problems: Parameter 'x' implicitly has an 'any' type.
```

```typescript
// 主动声明x是any避免错误
function getNum(x: any) {
  return x;
}
```

```typescript
// 这种情况不会报错，因为隐式推断成undefined
let y;
console.log(y);
```

```typescript
// 这种情况也不会报错，因为赋值的时候类型推断成number
let z;
z = 123;
console.log(z);
```

### 严格检查

默认情况 undefined 和 null 是其他类型的子类型，也就是其他类型变量可以被赋值 null 或 undefined。开启后会检查这种情况并报错。

```typescript
let num: number = undefined;
// problems:Type 'undefined' is not assignable to type 'number'.
```

### 错误不输出

ts 默认即使编译报错也会生成 Js 文件，这一项设置 true,可以在报错的时候，不生成 js

## 基础

### 标记类型

- boolean,number,string,null,undefined
- void(一般用于函数空返回值，void 类型的变量可以赋值 undefined,不能赋值 null)
- any(允许被赋值给任意类型，any 类型不会被类型检查）
- unkonwn(允许被赋值给任意类型)

### 类型推论

定义时未指定类型且未赋值会被推断成 any，若赋值则会推断成赋值的类型

```ts
let myFavoriteNumber = "seven"; //推断成string
```

### 联合类型

‘或’

```ts
let myFavoriteNumber: string | number;
```

### 交叉类型

‘与’

```typescript
interface A {
  a: string;
}
interface B {
  b: string;
}
let test: A & B = {
  a: "test a",
  b: "test b",
};
```

### 对象的类型

#### 描述对象的形状（shape）

```typescript
interface Person {
  name: string;
  age: number;
}
let tom: Person = {
  name: "Tom",
  age: 25,
};
```

#### 定义的变量比接口少一些属性或多一些属性都是不允许的

可选属性

```typescript
interface Person {
  name: string;
  age?: number;
}

let tom: Person = {
  name: "Tom",
};
```

任意属性

```typescript
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  name: "Tom",
  gender: "male",
};
```

需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：

```typescript
interface Person {
  name: string;
  age?: number;
  [propName: string]: string;
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.

//上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。
```

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```typescript
interface Person {
  name: string;
  age?: number;
  [propName: string]: string | number | undefined; // 因为age不一定有，可能是undefined
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};
```

只读属性

> 有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性
> 简单例子

```typescript
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  id: 89757,
  name: "Tom",
  gender: "male",
};

tom.id = 9527;

// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
// 上例中，使用 readonly 定义的属性 id 初始化后，又被赋值了，所以报错了。
```

注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：

```typescript
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  name: "Tom",
  gender: "male",
};

tom.id = 89757;

// index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
//   Property 'id' is missing in type '{ name: string; gender: string; }'.
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
//例中，报错信息有两处，第一处是在对 tom 进行赋值的时候，没有给 id 赋值。第二处是在给 tom.id 赋值的时候，由于它是只读属性，所以报错了。
```

### 数组的类型

#### 类型+方括号表示法

```ts
let fibonacci: number[] = [1, 2, 3, 4];
```

#### 泛型表示法（常用）

```ts
let fibonacci: Array<number> = [1, 2, 3, 4];
```

#### 接口表示法（不常见）

```ts
interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 2, 3, 4];
```

#### 类数组的表示

类数组不是数组，不能用数组表示，但是可以参照接口表示法来写
比如函数参数 arguments。但事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等

```ts
function sum() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}
//上述等价于
function sum() {
  let args: IArguments = arguments;
}
//IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
interface IArguments {
  [index: number]: any;
  length: number;
  callee: Function;
}
```

### 函数的类型

#### 函数声明式（简单，推荐）

```ts
function sum(x: number, y: number): number {
  return x + y;
}
```

#### 函数表达式

```ts
let mySum: (x: number, y: number) => number = (
  x: number,
  y: number
): number => {
  return x + y;
};
// 第一个冒号到第一个等号之间的可以省略，相当于不写type
//ts会类型推断的，不然这么写
//就像写了两遍

//或者这么写，注意是Function不是function，其实也相当于少写了type
let newSum: Function = (x: number, y: number): number => {
  return x + y;
};
```

#### 用接口定义函数,注意参数的括号

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc = (source: string, subString: string): boolean => {
  return source.search(subString) !== -1;
};
```

#### 可选参数（可选参数要放在最后），参数默认值

```ts
function buildName(firstName?: string, lastName: string = "Clark"): string {
  if (firstName) {
    return firstName + lastName;
  }
  return lastName;
}
```

#### 剩余参数，...rest 访问剩余参数

```ts
function myPush(array: Array<unknown>, ...rest: Array<unknown>) {
  rest.forEach((item) => {
    array.push(item);
  });
}
myPush([], 1, 2, 3);
```

#### 重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理
比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'

```ts
function reverse(x: number | string): number | string | void {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
```

然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串
这时，我们可以使用重载定义多个 reverse 的函数类型：

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
//上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

//注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
```

### 类型断言

#### 语法

- 值 as 类型（推荐）
- `<类型>`值 （不推荐，tsx 语法中`<Foo>`表示 ReactNode；而在 ts 中泛型也是这种语法，容易混淆）
- 作用：给一个类型断言，让 ts 编译器听你的，若使用不当会造成运行时错误。常用于 ts 的一些不好解决的报错
- 示例

```ts
interface Cat {
  name: string;
  run(): void;
}
interface Fihs {
  name: string;
  swim(): void;
}
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim) {
    return true;
  }
  return false;
}
```

```ts
(window as any).foo = 1;
```

```ts
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom = getCacheData("tom") as Cat;
tom.run();
```

```ts
//用泛型可以更好地实现上述代码
function getCacheData<T>(key: string): T {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom = getCacheData<Cat>("tom");
tom.run();
```

### 声明文件
