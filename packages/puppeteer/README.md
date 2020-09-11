## 快速上手

### Install
```shell
npm install puppeteer --save-dev
```

###  Write tests
puputeer 需结合测试框架使用，以 mocha 为例
1. 安装 mocha
```shell
npm install mocha --save-dev
```
2. 在 package.json 中配置命令
```javascript
  "scripts": {
    "test": "mocha"
  },
```

### Excute tests
```shell
npm test
```

### Debugger

#### Turn off headless mode
```javascript
const browser = await puppeteer.launch({headless: false});
```

#### Use debugger in application code browser
```javascript
await page.evaluate(() => {debugger;});
```

#### Use debugger in node.js
1. 先在 package.json 中配置命令
```javascript
  "scripts": {
    "test": "mocha",
    "debug": "mocha --inspect-brk"
  },
```
2. 执行命令
```shell
npm run debug
```
3. Chrome 访问 chrome://inspect/#devices，点击对应 target 的 inspect