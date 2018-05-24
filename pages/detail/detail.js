/**
 * 美图图片接口：
 * http://p0.meituan.net/w.h/shaitu/592167e0826aec5b617b961d061b3096409943.jpg
 * 
 * 每个图片提供了一个提供的接口，通过传入不同的 w.h 来获取到不同尺寸的图片
 * 比如：
 *  http://p0.meituan.net/100.100/shaitu/592167e0826aec5b617b961d061b3096409943.jpg
 *  获取宽高为 100px 的图片
 * 
 * 
 * 第一次渲染页面的时候，detail的值为：{}，此时，detail.images 就是undefined
 * 等到请求获取到数据以后，此时，调用 setData() 方法，将获取到的数据，重新渲染到页面中，此时，detail.images 才有值
 */

// 导入fetch
import fetch from '../../utils/fetch.js'

Page({
  data: {
    // 详情数据
    detail: {}
  },

  onLoad(query) {
    fetch(`/shops/${query.id}`)
      .then(res => {
        // console.log(res.data)
        this.setData({
          detail: res.data
        })

        wx.setNavigationBarTitle({
          title: res.data.name,
        })
      })
  },

  // 图片预览
  previewImage(e) {
    let { urls, current } = e.currentTarget.dataset

    // 注意：
    // replace() 方法不会修改原始的字符串，而是返回了一个新的字符串
    // 使用数组的map方法，得到一个新的数组，新数组中每一项的值，是由每个回调函数的返回值决定的

    current = current.replace('w.h', '1000.1000')
    urls = urls.map(item => {
      return item.replace('w.h', '1000.1000')
    })

    // 预览图片接口
    wx.previewImage({
      // 当前显示的图片地址
      current,
      // 图片地址
      // 注意：此处的图片地址为 大图 地址
      urls,
    })
    // wx.previewImage({
    //   // 当前显示的图片地址
    //   current: 'http://p0.meituan.net/1000.1000/shaitu/592167e0826aec5b617b961d061b3096409943.jpg',
    //   // 图片地址
    //   // 注意：此处的图片地址为 大图 地址
    //   urls: ['http://p0.meituan.net/1000.1000/shaitu/4ffbaec3f82fe3b4240aedb22fee22e5267105.jpg', 'http://p0.meituan.net/1000.1000/shaitu/592167e0826aec5b617b961d061b3096409943.jpg'],
    // })
  }

  // 注意：在 wxml 中，不能调用 js 文件中提供的方法！！！
  // fn(img) {
  //   console.log('函数fn执行了')
  //   return img.replace('w.h', '100.100')
  // }
})