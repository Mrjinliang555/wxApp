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

  // 我们验证发现：点击左上角的返回按钮后，该页面被卸载掉了
  // 所以，onLoad每次进入页面都会触发
  onLoad(query) {
    // id值
    // console.log(query.id)

    // 注意：因为id不会展示在页面中，而是为了获取数据用的，因此，不需要调用 setData()
    // 只有页面中用到的数据，才会调用 setData()
    this.data.id = query.id

    this.loadData()
  },

  // 封装一个方法，用来加载数据
  loadData() {
    // 从 data 中解构出需要的数据
    let { id, curPage, list, hasMore } = this.data

    // 让当前页加1，表示要加载下一页数据
    curPage++
    
    // _page 表示获取第几页的数据
    // _limit 表示每页大小
    fetch(`/categories/${this.data.id}/shops?_page=${curPage}&_limit=10`)
      .then(res => {
        // 获取到总条数
        const total = res.header['X-Total-Count'] // 80
        // 总页数
        const totalPage = Math.ceil(total / 10)
        if (curPage >= totalPage) {
          // 没有下一页数据
          hasMore = false
        } else {
          // 有下一页数据
          hasMore = true
        }

        console.log('当前页：', curPage, '还有下一页：', hasMore)

        // console.log(res)
        this.setData({
          hasMore,
          curPage,
          // 新获取到的数据在后面
          list: [...list, ...res.data]
        })
      })
  },

  // 触底加载更多数据：
  onReachBottom() {
    // console.log('触底了~ 加载更多数据')

    // 加载下一页数据
    // this.loadData()
    // 判断是否达到最后一页，如果到了，就不要加载下一页的数据了
    if (this.data.hasMore) {
      this.loadData()
    }
  }
})