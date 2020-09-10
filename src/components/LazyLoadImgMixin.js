export default {
  data() {
    return {
      scrollTimeout: null,
      lazyLoadBgs: [],
      lazyLoadImgs: [],
    };
  },
  beforeDestroy() {
    this.removeScrollEvent();
  },
  methods: {
    // 滚动时执行
    onScroll() {
      if (!this.lazyLoadBgs.length && !this.lazyLoadImgs.length) {
        this.removeScrollEvent();
        return;
      }
      if (this.scrollTimeout) {
        return;
      }
      this.scrollTimeout = setTimeout(() => {
        this.scrollTimeout = null;
      }, 100);
      this.loadLazyImgs(this.lazyLoadBgs, 'bg');
      this.loadLazyImgs(this.lazyLoadImgs, 'src');
    },
    loadLazyImgs(imgs, type) {
      let index = 0;
      imgs.every((img, idx) => {
        const tmpImg = img;
        if (tmpImg.getBoundingClientRect().top < window.innerHeight * 1.5) {
          index = idx;
          if (type === 'bg') {
            tmpImg.style.backgroundImage = `url(${tmpImg.dataset.lazyLoadBg})`;
          } else if (type === 'src') {
            tmpImg.src = tmpImg.dataset.lazyLoadSrc;
          }
          return true;
        }
        return false;
      });
      imgs.splice(0, index);
    },
    // 监听滚动
    addScrollEvent() {
      this.lazyLoadBgs = Array.from(document.querySelectorAll('[data-lazy-load-bg]'));
      this.lazyLoadImgs = Array.from(document.querySelectorAll('[data-lazy-load-src]'));
      if (this.lazyLoadBgs.length || this.lazyLoadImgs.length) {
        window.addEventListener('scroll', this.onScroll);
        this.onScroll();
      }
    },
    // 移除滚动
    removeScrollEvent() {
      window.removeEventListener('scroll', this.onScroll);
    },
  },
};
