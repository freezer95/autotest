const assert = require('assert');
const sinon = require('sinon');
const PubSub = require('pubsub-js');

// This is just an example of an external library you might require()
const obj = {};
obj.sum = function sum(a, b) {
  console.log('---stub:: origin obj.sum exec: ', a, b)
  return a + b;
};

describe('stubs', function () {
  // Creating a spy as an anonymous function
  describe('Creating a spy as an anonymous function', function () {
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore();
    });

    it('should call all subscribers, even if there are exceptions', function () {
      const message = 'message-stubs';
      const stub = sinon.stub().throws();
      const spy = sinon.spy();
      const clock = sinon.useFakeTimers();

      PubSub.subscribe(message, stub);
      PubSub.subscribe(message, spy);

      assert.throws(() => {
        PubSub.publishSync(message, 'some data');
        // PubSubJS reschedules exceptions using setTimeout(fn,0)
        // We have faked the clock, so just tick the clock to throw!
        clock.tick(1);
      });

      assert.throws(stub);
      assert.ok(spy.called);
      assert.ok(stub.calledBefore(spy));

      clock.restore();
    });
  });

  // Using a spy to wrap all object method
  describe('Using a spy to wrap all object method', function () {
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore();
    });
    it('should call through', function () {
      sinon
        .stub(obj, 'sum')
        .withArgs(2, 2)
        .callsFake(function foo(a, b) {
          console.log('---stub:: stub obj.sum exec: ', a, b)
          return 'bar';
        });

      // Causes the original method wrapped into the stub to be called when none of the conditional stubs are matched.
      // obj.sum.callThrough();
      // assert.equal(obj.sum(1, 2), 3);
      assert.equal(obj.sum(1, 2), undefined);
      assert.equal(obj.sum(2, 2), 'bar');
    });
  });
});
