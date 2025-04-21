---
title: React 简单优化
description: React
date: 2022-09-03
tags:
  - React
---

### 优化的原因

react 里的一个基本常识是 re-render：当一个组件里的某个状态改变的时候，他会重新渲染，也就是重新执行所有组件代码，包括它的子组件。

所以会带来很多不必要的重新渲染。

### useMemo

useMemo 的基本理念是，它允许我们在渲染之间 "记住 "一个计算值

#### 使用的场景举例

```tsx
function App() {
  const [selectedNum, setSelectedNum] = React.useState(100);
  const time = useTime();

  const allPrimes = React.useMemo(() => {
    const result = [];

    for (let counter = 2; counter < selectedNum; counter++) {
      if (isPrime(counter)) {
        result.push(counter);
      }
    }

    return result;
  }, [selectedNum]);

   return (
    <-省略dom->
   )
```

这里 App 组件里有一个状态 selectedNum,还有一个自定义 hook 导出的状态 time。假如不使用 useMemo 包裹 allPrimes，那么每当 time 变化的时候，就会重新执行 allPrimses 里面的代码，造成浪费；然而我们的 allPrimes 其实只跟 selectedNum 相关，所以我们这里用 useMemo 缓存函数包裹后，里面的代码就只会在 selectedNum 变化时执行，而不受 App 组件的 re-render 影响。

当然，这里也可以有其他的写法，我们可以把 allPrimes 和 selectedNum 包括它的 dom 合并成一个子组件，time 和它的 dom 也合并成一个子组件

```tsx
function App(){

  return(
  	<Time />
    <AllPrimes />
  )
}
```

这样，他们的状态隔离开，也可以实现当 time 里面的状态改变的时候，不会影响别的代码去 re-render。

但是，有时候，我们反而是需要把状态放到外部组件的，因为可能有别的组件也同样依赖这个状态。

```tsx
function App(){
  const time = useTime();
  return(
  	<Time time={time} />
    <AllPrimes />
  )
}
```

这样的话，当 App 组件的 time 状态变化的时候，其实同样会使 Time 组件和 AllPrimes 组件 re-render。这个时候，就可以使用 React.memo 来优化

```tsx
const PureAllPrimes = React.memo(AllPrimes);
function App(){
  const time = useTime();
  return(
  	<Time time={time} />
    <PureAllPrimes />
  )
}
```

React.memo 可以把一个组件变成 pure component，pure component 只有在 props 变化的时候，才会 re-render；

当然，也可以在 AllPrimes 组件里，导出的时候去使用 React.memo

```tsx
export default React.memo(AllPrimes);
```

我们来举另外一个例子

Boxes 是一个 pure component,只有 boxes 变化的时候，才会 re-render;

```tsx
function Boxes({ boxes }) {
  return (
    <div className="boxes-wrapper">
      {boxes.map((boxStyles, index) => (
        <div key={index} className="box" style={boxStyles} />
      ))}
    </div>
  );
}

export default React.memo(Boxes);
```

App 组件里引用了 Boxes,并声明常量 boxes 传入 Boxes 组件里

```tsx
import Boxes from './Boxes';

function App() {
  const [name, setName] = React.useState('');
  const [boxWidth, setBoxWidth] = React.useState(1);
  const boxes = [
    { flex: boxWidth, background: 'hsl(345deg 100% 50%)' },
    { flex: 3, background: 'hsl(260deg 100% 40%)' },
    { flex: 1, background: 'hsl(50deg 100% 60%)' },
  ];

  return (
    <>
      <Boxes boxes={boxes} />
      <-省略dom->
    </>
  );
}
```

当状态 name 变化的时候，我们期望只是 re-render App 组件，Boxes 组件不 re-render，然而 Boxes 组件仍然 re-render 了。这是因为，App 组件 re-render 的时候，重新生成了 boxes 变量，尽管是同样的值，但不是一个引用，所以导致了 Boxes 组件的 re-render

要解决这个问题，只需要使用 useMemo 包裹一下即可

```tsx
const boxes = React.useMemo(() => {
  return [
    { flex: boxWidth, background: "hsl(345deg 100% 50%)" },
    { flex: 3, background: "hsl(260deg 100% 40%)" },
    { flex: 1, background: "hsl(50deg 100% 60%)" },
  ];
}, [boxWidth]);
```

### UseCallback

它跟 useMemo 是一样的，都是缓存函数，但是他缓存的不是值，而是函数；

#### 使用场景举例

MegaBoost 是一个 pure component,接受一个 callback 回调函数，只有当 callback 变化的时候才会 re-render

```tsx
function MegaBoost({ handleClick }) {
  console.log("Render MegaBoost");

  return (
    <button className="mega-boost-button" onClick={handleClick}>
      MEGA BOOST!
    </button>
  );
}

export default React.memo(MegaBoost);
```

App 组件里引用了 MegaBoost

```tsx
function App() {
  const [count, setCount] = React.useState(0);
  function handleMegaBoost() {
    setCount((currentValue) => currentValue + 1234);
  }

  return (
    <>
      Count: {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click me!
      </button>
      <MegaBoost handleClick={handleMegaBoost} />
    </>
  );
}

export default App;
```

App 里声明了一个状态 count，一个函数 handleMegaBoost 并传入 MegaBoost 组件。

当状态 count 变化的时候，会触发 App 组件的 re-render，并且重新生成一个新的 handleMegaBoost 传入 MegaBoost 组件，导致 MegaBoost 组件的 re-render。

怎么解决这个问题呢？很简单，使用缓存函数即可

```tsx
const handleMegaBoost = React.useMemo(() => {
  return function () {
    setCount((currentValue) => currentValue + 1234);
  };
}, []);
```

但是，一般我们更倾向于使用 useCallback

```tsx
const handleMegaBoost = React.useCallback(() => {
  setCount((currentValue) => currentValue + 1234);
}, []);
```

### 总结

1. 组件里一些”经过复杂的逻辑计算而得到某个值“需要使用 Usememo 包裹，保证组件在 re-render 的时候不去重复计算
2. 父子组件的场景，子组件尽量用 React.memo 包裹成 pure component，避免父组件的 re-render 导致子组件跟着一起 re-render
3. 父子组件的场景，父组件声明变量传入子组件的时候，尽量用 useMemo 包裹，避免父组件 re-render 导致重新生成变量，而进一步导致子组件的 re-render
4. 父子组件的场景，副组件声明 callback 传入子组件的时候，尽量使用 useCallback 包裹，避免父组件 re-render 导致重新生成 callback，而进一步导致子组件的 re-render

### 引用链接

[引用链接](https://www.joshwcomeau.com/react/usememo-and-usecallback/#use-case-2-preserved-references)
