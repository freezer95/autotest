const test = require('ava');
// TODO:  断点调试找 console 出不来的原因

test.serial('A', (t) => {
  console.log('---A start:', new Date())
  t.deepEqual('A', 'A');
  console.log('---A end:', new Date())
})
test.serial('B', (t) => {
  console.log('---B start:', new Date())
  t.deepEqual('B', 'B');
  console.log('---B end:', new Date())
})

test('foo', async t => {
  console.log('---C start:', new Date())
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  })
  console.log('---C end:', new Date())
  // t.pass();
  t.deepEqual('C', 'C');
});

test('bar', async t => {
  console.log('---D start:', new Date())
  const bar = Promise.resolve('D');
	// t.is(await bar, 'bar');
  t.deepEqual(await bar, 'D');
  console.log('---D start:', new Date())
});