<template>
  <div id="loadmore">上拉加载更多</div>
</template>

<script>
export default {
  data() {
    const onScrollInstance = this.onScroll.bind(this);
    return {
      onScrollInstance,
      scrollTimeout: null,
    };
  },
  methods: {
    onScroll() {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      this.scrollTimeout = setTimeout(this.loadMore.bind(this), 150);
    },
    loadMore() {
      if (window.scrollY + window.innerHeight >= this.$el.offsetTop) {
        // this.getActivityListListory(this.otherVoucherListPage + 1);
        this.$emit('loadmore');
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScrollInstance);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScrollInstance);
  },
  activated() {
    window.addEventListener('scroll', this.onScrollInstance);
  },
  deactivated() {
    window.removeEventListener('scroll', this.onScrollInstance);
  },
};
</script>

<style lang='less'>
#loadmore {
  margin-top: 5.25vw;
  padding-bottom: 5.25vw;
  text-align: center;
  color: #999;
  font-size: 3.75vw;
}
</style>
