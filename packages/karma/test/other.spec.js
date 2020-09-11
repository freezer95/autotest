describe("测试环境及覆盖率测试",function(){
  it("其他文件变量√",function(){
    const text = document.createTextNode('other.js\n')
    document.body.appendChild(text)
    expect(str).toBe('index.js')
  });

  it("减法测试",function(){
    var subtract5 = subtract(5)
     expect(subtract5(5)).toBe(0)
  })

  it("除法测试",function(){
    var divide5 = divide(5)
     expect(divide5(5)).toBe(1)
  })
})