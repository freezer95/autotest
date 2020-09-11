const assert = require("assert");
const sinon = require("sinon");
const PubSub = require("pubsub-js");

// This is just an example of an external library you might require()
const myExternalLibrary = {
  getJSON(url) {
    console.log('---spy:: origin myExternalLibrary.getJSON exec')
    return this._doNetworkCall({ url: url, dataType: "json" });
  },
  _doNetworkCall(httpParams) {
    console.log('---spy:: origin myExternalLibrary._doNetworkCall exec: ', httpParams)
    return { result: 42 };
  },
};

describe("Spies", function () {
  // Creating a spy as an anonymous function
  describe("Creating a spy as an anonymous function", function () {
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore();
    });

    it("should call subscribers on publish", function () {
      const message = "message-spies";
      const callback = sinon.spy();

      PubSub.subscribe(message, callback);
      PubSub.publishSync(message);

      assert.ok(callback.called);
    });
  });

  // Using a spy to wrap all object method
  describe("Using a spy to wrap all object method", function () {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
      sandbox.spy(myExternalLibrary);
    });

    afterEach(function () {
      // Restore the default sandbox here
      sandbox.restore();
    });

    it("should inspect the external lib's usage of its internal methods", function () {
      const url = "https://jsonplaceholder.typicode.com/todos/1";
      myExternalLibrary.getJSON(url);

      assert(myExternalLibrary.getJSON.calledOnce);
      assert(myExternalLibrary._doNetworkCall.calledOnce);
      assert.equal(
        url,
        myExternalLibrary._doNetworkCall.getCall(0).args[0].url
      );
      assert.equal(
        "json",
        myExternalLibrary._doNetworkCall.getCall(0).args[0].dataType
      );
    });
  });
});
