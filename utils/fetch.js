// fetch
// JS 遵循CommonJS规范
// module.exports = {}

// ES6中的模块化规范：
// data = {} 表示：参数默认值
export default function (url, data = {}) {
  // 需求：使用ES6中的Promise封装 wx.request() 方法
  // resolve表示成功的回调函数
  // reject表示失败的回调函数
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'GET',
      url: `https://locally.uieee.com${url}`,
      // 参数
      data,
      // 成功，会子调用触发sucesss，也就是会自动调用resolve
      success: resolve,
      // success: function (res) {
      //   resolve(res)
      // },
      fail: reject
    })
  })
}

// function fn(res) {}
// var obj = {}
// obj.say = fn
// console.log(obj.say)

// ES6的模板字符串语法：
// const num = 6
// const str = `
//   <div>${num}</div>
// `
// const str1 = '<div>' + num + '</div>'