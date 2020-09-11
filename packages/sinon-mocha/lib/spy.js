// sinon v9.0.2
(function injectSpy(global) {
  global.sinon = global.sinon || {};
  global.sinon.spy = spy;

  function spy(object, property, types) {
    if (!object && !property) {
      // 匿名函数
      return createSpy(function () {});
    }
    if (object && typeof object[property] === "function") {
      // 对象方法
      object[property] = createSpy(object[property]);
      return object[property];
    }
    // ...省略其他场景
  }

  function createSpy(func) {
    const proxy = global._createProxy(func);
    return proxy;
  }
})(window);

// 测试
(function test() {
  // 示例一：匿名函数
  const callback = sinon.spy();
  callback(1);
  callback(2);
  console.info(
    "type::spy---callback.callIds:",
    JSON.stringify(callback.callIds)
  );
  console.info("type::spy---callback.args:", JSON.stringify(callback.args));

  // 示例二：对象方法
  const obj = {
    sum: function sum(a) {
      console.info(
        `type::spy---exec origin method with ${JSON.stringify(arguments)}`
      );
      return a + "-origin";
    },
  };
  sinon.spy(obj, "sum");
  obj.sum(3);
  obj.sum(4);
  console.info("type::spy---obj.sum.callIds:", JSON.stringify(obj.sum.callIds));
  console.info("type::spy---obj.sum.args:", JSON.stringify(obj.sum.args));
  console.info(
    "type::spy---obj.sum.returnValues:",
    JSON.stringify(obj.sum.returnValues)
  );
})();
