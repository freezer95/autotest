
## 快速上手

### Environment
操作系统：MacOS
桌面浏览器：Safari、Chrome、Firefox

### Install
1. 安装 Nightwatch
```shell
npm install nightwatch --save-dev
```
2. 至少安装一个 Webdriver
```shell
npm install chromedriver --save-dev
npm install geckodriver --save-dev
```
3. 安装 Selenium Server（Nightwatch 1.0 开始非必须）
> You will only need Selenium Server when testing against Internet Explorer, if you wish to run tests in parallel in multiple browsers, or in a Selenium Grid environment.
```shell
npm install selenium-server --save-dev
```
### Configuration
生成配置文件有手动和自动两种方式，这里演示自动生成配置文件（手动模式参考官网配置文档）
1. 在 package.json 的 scripts 中增加命令 nigthwatch
```javascript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "nightwatch": "nightwatch"
  }
```
2. 执行 nigthwatch，执行结束后，可以观察到项目根目录下自动生成 nightwatch.conf.js 成功
```shell
npm run nightwatch
```
3. 在项目下创建测试脚本目录：tests，并添加到配置文件 nightwatch.conf.js 中
```shell
"src_folders" : ["tests"]
```
### Write tests
在测试脚本目录下增加测试脚本，简单示例：
```javascript
describe('demo', function() {
  test('test', function(browser) {
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
```
### Excute tests
```shell
npm run nightwatch -- --env firefox
npm run nightwatch -- --env chrome
npm run nightwatch -- --env safari
```

### 常见问题
1. Error: An error occurred while retrieving a new session: "Could not create a session: You must enable the 'Allow Remote Automation' option in Safari's Develop menu to control Safari via WebDriver."
解决方案：修改 safari 开发配置，顶部配置栏 -> 开发 -> 允许远程自动化。

2. 版本13.0.5 (15608.5.11) click 偶尔失效
解决方案：使用最新的 Safari Technology Preview，详见：https://github.com/nightwatchjs/nightwatch/issues/2281；https://bugs.webkit.org/show_bug.cgi?id=202589；https://macops.ca/using-safari-technology-preview-with-selenium-webdriver/；
