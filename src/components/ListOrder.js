export default class List {
  constructor({
    url, ListName = '', beforeAddList, afterAddList, vue,
  }) {
    // get and set data
    this.vue = vue;
    this.pageSize = 20;
    this.reset();

    // request data
    this.isRequest = false;
    this.url = url;
    this.ListName = ListName;

    this.beforeAddList = beforeAddList;
    this.afterAddList = afterAddList;
  }

  reset() {
    this.List = [];
    this.curPage = -1;
    this.lastPage = 0;
    this.totalLen = 1;
    this.loadmore = null;
    this.empty = null;
  }

  addList(list) {
    this.List.push(...list);
  }

  setList(list) {
    this.List = list;
  }

  setCurPage(page) {
    this.curPage = page;
  }

  setLastPage(page) {
    this.lastPage = page;
  }

  setTotalLen(num) {
    this.totalLen = num;
  }

  setLoadmore() {
    this.loadmore = this.canLoadmore();
  }

  setEmpty() {
    this.empty = this.List.length === 0;
  }

  canLoadmore() {
    return this.List.length < this.totalLen;
  }

  getList({ reset = false } = {}) {
    if (reset) {
      this.reset();
    }
    if (!this.canLoadmore() || this.curPage >= this.lastPage) {
      return Promise.reject(new Error('can not load more'));
    }
    if (this.isRequest) {
      return Promise.reject(new Error('isRequest'));
    }
    this.isRequest = true;

    const loading = this.vue.$loading({
      className: 'fixed-loading',
    });
    return this.vue.$http('get', this.url.api, {
      query: { pageSize: this.pageSize, pageNum: this.curPage + 1, ...this.url.params },
    })
      .then(res => {
        const { data, total } = res;
        if (this.beforeAddList && typeof this.beforeAddList === 'function') {
          this.beforeAddList(data);
        }
        this.addList(data);
        this.setCurPage(this.curPage + 1);
        this.setLastPage(Math.floor(total / this.pageSize));
        this.setTotalLen(total);
        this.setLoadmore();
        this.setEmpty();
        if (this.afterAddList && typeof this.afterAddList === 'function') {
          this.afterAddList(data);
        }
      }).catch(() => { }).finally(() => {
        if (loading) {
          loading.close();
        }
        this.isRequest = false;
      });
  }
}
