const assert = require('assert');
const sinon = require('sinon');
const PubSub = require('pubsub-js');

describe('mocks', function () {
  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });

  it('test should call all subscribers when exceptions', function() {
    const message = 'message-mocks';
    const spyAPI = { method: function () {
      console.log('---mock:: origin spyAPI.method exec')
    } };
    const mockAPI = { method: function () {
      console.log('---mock:: origin mockAPI.method exec')
    } };

    var spy = sinon.spy(spyAPI, 'method');
    const mock = sinon.mock(mockAPI);
    mock.expects('method').once();

    PubSub.subscribe(message, mockAPI.method);
    PubSub.subscribe(message, spyAPI.method);
    PubSub.publishSync(message, undefined);

    mock.verify();
    assert.ok(spy.calledOnce);
  });
});
