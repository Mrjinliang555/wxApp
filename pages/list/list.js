// 导入fetch
import fetch from '../../utils/fetch.js'

/**
 * 如何实现触底加载更多效果的分页
 * 
 */

Page({
  data: {
    // 商品列表
    list: [],
    // id
    id: null,
    // 当前页
    curPage: 0,
    // 是否有更多数据
    hasMore: true
  },

  onLoad(query) {
    this.data.id = query.id
    this.loadData()
  },

  // 在 onReady 钩子函数中设置标题
  onReady() {
    fetch(`/categories/${this.data.id}`)
      .then(res => {
        wx.setNavigationBarTitle({
          title: res.data.name,
        })
      })
  },

  // 封装一个方法，用来加载数据
  loadData() {
    let { id, curPage, list } = this.data
    // 让当前页加1，表示要加载下一页数据
    curPage++
    
    fetch(`/categories/${this.data.id}/shops?_page=${curPage}&_limit=10`)
      .then(res => {
        // console.log(res)
        this.setData({
          hasMore: curPage < Math.ceil(res.header['X-Total-Count'] / 10),
          curPage,
          // 新获取到的数据在后面
          list: [...list, ...res.data]
        })
      })
  },

  // 触底加载更多数据：
  onReachBottom() {
    // 如果有下一页数据，就加载下一页数据
    this.data.hasMore && this.loadData()
  }
})