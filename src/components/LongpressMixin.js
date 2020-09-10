export default {
  data() {
    return {
      longpressTimeout: null,
      clickTimeout: null,
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
    };
  },
  methods: {
    touchstart(e, args = {}) {
      let tmpObj = e;
      if (e.touches && e.touches[0]) {
        [tmpObj] = e.touches;
      }
      const { pageX, pageY } = tmpObj;
      this.startX = pageX;
      this.startY = pageY;
      this.moveX = pageX;
      this.moveY = pageY;
      this.longpressTimeout = setTimeout(() => {
        this.longpressTimeout = null;
        this.onLongpress(e, args);
      }, 1000);
    },
    touchmove(e) {
      let tmpObj = e;
      if (e.touches && e.touches[0]) {
        [tmpObj] = e.touches;
      }
      clearTimeout(this.longpressTimeout);
      this.longpressTimeout = null;
      const { pageX, pageY } = tmpObj;
      this.moveX = pageX;
      this.moveY = pageY;
    },
    touchend(e, args = {}) {
      if (this.longpressTimeout) {
        clearTimeout(this.longpressTimeout);
        this.longpressTimeout = null;
        if (this.moveX === this.startX && this.moveY === this.startY) {
          this.onClick(e, args);
        }
      }
    },
    onLongpress() { },
    onClick() { },
  },
};
