/* function useState(initialValue) {
  let value = initialValue;

  function setState(newValue) {
    value = newValue;
  }

  return [value, setState];
}

const [value, setValue] = useState(1);
console.log('初始值 ', value);
setValue(2);
console.log('更新值', value); */

const MyReact = (function() {
  const hooks = []; // 存放所有的 hook
  let currentHook = 0; // 当前 hook, 每调用一次 useXXX，就 currentHook 索引就加 1
  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      currentHook = 0; // 复位，为下一次 rerender 做准备
      return Comp;
    },
    useState(initialValue) {
      hooks[currentHook] = hooks[currentHook] || initialValue; // type: any

      // 给 setState 闭包准备的变量，因为 currentHook 在每次 render 都会重置为 0
      // 这边需要一个 setStateHookIndex 来保持值
      const setStateHookIndex = currentHook;

      function setState(newValue) {
        hooks[setStateHookIndex] = newValue;
      }

      return [hooks[currentHook++], setState];
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray; // 没有依赖，每次 render 都会运行 callback
      const deps = hooks[currentHook]; // type: array | undefined

      // 有一个 dep 发生变化，就需要调用 callback
      const hasDepsChanged = !deps || depArray.some((el, i) => el !== deps[i]); // deps 发生变化
      if (hasNoDeps || hasDepsChanged) {
        callback();
        hooks[currentHook] = depArray;
      }
      currentHook++;
    }
  };
})();

function Counter() {
  const [count, setCount] = MyReact.useState(1);
  const [text, setText] = MyReact.useState('hello');

  MyReact.useEffect(() => {
    console.log('effect:', count, text);
  }, [count, text]);

  return {
    click: () => {
      setCount(count + 1);
    },
    updateText: nextText => {
      setText(nextText);
    },
    render: () => {
      console.log('render：', { count, text });
    }
  };
}

// 下面这个使用方式，由于只调用了依次 MyReact.render
// 导致内部的 value 值始终是 1，后续通过 app.render 拿到的也都是 1
// const app = MyReact.render(Counter);
// app.render();
// app.click();
// app.render();

// 下面这个使用方式，调用了 MyReact.render 后，通过 App.click 获取到的 count 就是最新值
let App = MyReact.render(Counter);
App.click();
App = MyReact.render(Counter);
App.updateText('world');
App = MyReact.render(Counter);
