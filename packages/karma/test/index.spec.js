describe("运算功能单元测试",function(){
  it("其他文件变量√",function(){
    const text = document.createTextNode('index.js\n')
    document.body.appendChild(text)
    expect(str1).toBe('other.js')
  });

  it("加法函数测试",function(){
      var add5 = add(5)
      expect(add5(5)).toBe(10)
  });

  it("乘法函数测试",function(){
     var multi5 = multi(5)
      expect(multi5(5)).toBe(25)
  })
})