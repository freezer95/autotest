// sinon v9.0.2
(function injectStub(global) {
  global.sinon = global.sinon || {};
  global.sinon.stub = stub;

  function stub(object, property) {
    if (!object && typeof property === "undefined") {
      // 匿名函数
      return createStub();
    }
    if (object && typeof object[property] === "function") {
      // 对象方法
      const wrappedMethod = object[property];
      object[property] = createStub(wrappedMethod);
      // 保留原始方法的引用
      object[property].wrappedMethod = wrappedMethod;
      return object[property];
    }
    // ...省略其他场景
  }

  function createStub(originalFunc) {
    let proxy;

    function functionStub() {
      return getCurrentBehavior(proxy).invoke(this, arguments);
    }
    proxy = global._createProxy(functionStub, originalFunc || functionStub);
    // Inherit spy API:
    // global._util.extendNonEnum(proxy, spy);
    // Inherit stub API:
    Object.assign(proxy, stub);
    return proxy;
  }

  const behavior = {
    create: function create(stub) {
      const b = Object.assign({}, behavior);
      delete b.create;
      b.stub = stub;
      return b;
    },
    invoke: function invoke(context, args) {
      if (this.exception) {
        throw this.exception;
      } else if (this.fakeFn) {
        return this.fakeFn.apply(context, args);
      } else if (this.callsThrough) {
        return this.stub.wrappedMethod.apply(context, args);
      }
      // ...省略其他场景
    },
  };

  const defaultBehaviors = {
    callsFake: function callsFake(fake, fn) {
      fake.fakeFn = fn;
    },
    callThrough: function callThrough(fake) {
      fake.callsThrough = true;
    },
    // ...省略其他 API
  };

  Object.keys(defaultBehaviors).forEach(function (method) {
    if (
      defaultBehaviors.hasOwnProperty(method) &&
      !behavior.hasOwnProperty(method)
    ) {
      behavior[method] = function () {
        defaultBehaviors[method].apply(this, [this, ...arguments]);
        return this.stub || this;
      };
      stub[method] = createBehavior(method);
    }
  });

  function getCurrentBehavior(stubInstance) {
    return stubInstance.defaultBehavior || behavior.create(stubInstance);
  }

  function createBehavior(behaviorMethod) {
    return function () {
      this.defaultBehavior = this.defaultBehavior || behavior.create(this);
      this.defaultBehavior[behaviorMethod].apply(
        this.defaultBehavior,
        arguments
      );
      return this;
    };
  }
})(window);

// 测试
(function test() {
  // 示例一：匿名函数
  const callback = sinon.stub();
  callback(1);
  callback(2);
  console.info(
    "type::stub---callback.callIds:",
    JSON.stringify(callback.callIds)
  );
  console.info("type::stub---callback.args:", JSON.stringify(callback.args));
  // 示例二：对象方法
  const obj = {
    sum: function sum(a) {
      console.info(
        `type::stub---exec origin method with ${JSON.stringify(arguments)}`
      );
      return a + "-origin";
    },
  };
  sinon.stub(obj, "sum").callsFake(function sum(a) {
    console.info(
      `type::stub---exec fake method with ${JSON.stringify(arguments)}`
    );
    return a + "-fake";
  });
  // Causes the original method wrapped into the stub to be called when none of the conditional stubs are matched.
  obj.sum.callThrough();
  obj.sum(3);
  obj.sum(4);
  console.info(
    "type::stub---obj.sum.callIds:",
    JSON.stringify(obj.sum.callIds)
  );
  console.info("type::stub---obj.sum.args:", JSON.stringify(obj.sum.args));
  console.info(
    "type::stub---obj.sum.returnValues:",
    JSON.stringify(obj.sum.returnValues)
  );
})();
