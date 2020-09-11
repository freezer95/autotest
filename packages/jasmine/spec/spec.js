const forEach = require('../src/for-each');

describe("mock", function() {

  beforeEach(function() {
    spyOn(forEach)
    const mockCallback = x => 42 + x;
    forEach([0, 1], mockCallback);
  });

  it("mock", function() {
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not effect other functions", function() {
      expect(bar).toEqual(123);
  });

  it("when called returns the requested value", function() {
    expect(fetchedBar).toEqual(1001);
  });

  it("can call through and then stub in the same spec", function() {
    foo.setBar(123);
    expect(bar).toEqual(123);

    foo.setBar.and.stub();
    bar = null;

    foo.setBar(123);
    expect(bar).toBe(null);
});
});

