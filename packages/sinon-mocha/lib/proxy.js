// sinon v9.0.2
(function injectProxy(global) {
  global._createProxy = createProxy;

  let callId = 0;

  function createProxy(func, originalFunc) {
    const proxy = wrapFunction(func, originalFunc);
    proxy.invoke = invoke;
    return proxy;
  }

  function wrapFunction(func, originalFunc) {
    const p = function proxy() {
      return p.invoke(func, this, arguments);
    };
    // init
    p.callIds = p.callIds || [];
    p.args = p.args || [];
    p.exceptions = p.exceptions || [];
    p.returnValues = p.returnValues || [];
    return p;
  }

  function invoke(func, thisValue, args) {
    const currentCallId = callId++;
    let exception, returnValue;
    try {
      returnValue = (this.func || func).apply(thisValue, args);
    } catch (e) {
      exception = e;
    }
    // load
    this.callIds.push(currentCallId);
    this.args.push(args);
    this.exceptions.push(exception);
    this.returnValues.push(returnValue);
    return returnValue;
  }
})(window);
