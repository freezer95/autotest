## 快速上手

### Install
1. 选择搭配使用的[测试框架](https://www.npmjs.com/search?q=keywords:karma-adapter)
2. 安装 karma-cli，并生成配置文件
```shell
npm install karma --save-dev
npm install -g karma-cli
karma init
```
选择喜欢的测试框架，和代码的运行环境等，生成配置文件，这里选择 jasmine
3. 在 package.json 中配置 scripts
```javascript
  "scripts": {
    "test": "karma start"
  },
```

### Excute tests
```shell
npm test
```