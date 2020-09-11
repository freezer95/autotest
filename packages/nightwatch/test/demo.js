describe('nightwatch', function() {
  test('search nightwatch', function(browser) {
    browser
      .url('https://www.baidu.com/')
      .waitForElementVisible('body')
      .assert.titleContains('百度一下')
      .assert.visible('input[name=wd]')
      .setValue('input[name=wd]', 'nightwatch')
      .assert.visible('input[type=submit]')
      .click('input[type=submit]')
      .waitForElementVisible('#content_left', 3000)
      .assert.containsText('#content_left', 'Nightwatch.js')
      .end();
  });
});