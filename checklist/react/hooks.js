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
  let value;
  let deps;
  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useState(initialValue) {
      value = value || initialValue;

      function setState(newValue) {
        value = newValue;
      }

      return [value, setState];
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray; // 没有依赖，每次 render 都会运行 callback
      // 有一个 dep 发生变化，就需要调用 callback
      const hasDepsChanged = !deps || depArray.some((el, i) => el !== deps[i]); // deps 发生变化
      if (hasNoDeps || hasDepsChanged) {
        callback();
        deps = depArray;
      }
    }
  };
})();

function Counter() {
  const [count, setCount] = MyReact.useState(1);

  MyReact.useEffect(() => {
    console.log('effect:', count);
  }, [count]);

  return {
    click: () => {
      setCount(count + 1);
    },
    render: () => {
      console.log('render：', { count });
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
