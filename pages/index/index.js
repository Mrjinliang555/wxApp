/**
 * 小程序上线的时候，需要在 小程序后台 设置 服务器域名，并且域名只支持：https协议
 * 在开发期间，可以通过 微信开发者工具中提供的： 不校验合法域名 选项，来跳过小程序对域名的限制
 */

// 导入 fetch.js
import fetch from '../../utils/fetch.js'

Page({
  data: {
    // 轮播图数组
    list: [],
    // 九宫格菜单数据
    menus: []
  },

  // 问题：在哪个钩子函数中发送请求获取数据
  onShow() {
    // 获取轮播图数据
    fetch('/slides')
      .then((res) => {
        this.setData({
          list: res.data
        })
      })
    
    // 获取九宫格菜单数据
    fetch('/categories')
      .then((res) => {
        this.setData({
          menus: res.data
        })
      })

    // // 发送请求，获取数据
    // wx.request({
    //   url: 'https://locally.uieee.com/slides',
    //   method: 'GET',
    //   success: (res) => {
    //     // res.data 表示服务器返回的数据
    //     // 在页面中要使用通过接口获取到的数据，如何将数据丢给视图使用呢？？？
    //     // console.log(res)
    //     this.setData({
    //       list: res.data
    //     })
    //   }
    // })

    // // 获取九宫格菜单数据
    // wx.request({
    //   url: 'https://locally.uieee.com/categories',
    //   success: (res) => {
    //     this.setData({
    //       menus: res.data
    //     })
    //   }
    // })
  }
})