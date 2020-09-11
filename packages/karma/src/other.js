const str1 = 'other.js'

// 加法函数
function subtract(x){
  return function(y){
      return x - y;
  }
}

// 乘法函数
function divide(x){
  return function(y){
      return x / y;
  }
}
