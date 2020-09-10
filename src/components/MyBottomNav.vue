<template>
  <nav class="mu-bottom-nav bottom-nav-container" tabindex="0">
    <img src="../assets/images/bg_bottom_nav.png" class="bottom-nav-bg">
    <ul class="mu-bottom-nav-shift-wrapper">
      <li class="mu-bottom-item" tabindex="0" v-for="(item, index) in navList" :key="index">
        <div class="mu-bottom-item-wrapper">
          <mu-ripple class="bottom-nav-ripple" @click="change(item.value)">
          </mu-ripple>
          <div class="bottom-nav-icon" :class="{'with-badge': (item.value === 2 || item.value === 4) && cabinetTimeout}">
            <img :class="{'big-icon': item.value === 1, 'active-icon': value === 1}" :src="value === item.value ? item.activeIcon : item.icon"
              :alt="item.title">
          </div>
          <span class="mu-bottom-item-text bottom-nav-text">{{ item.tabTitle }}</span>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import navigators from '../common/navigators';

export default {
  data() {
    return {
      navList: navigators.list,
    };
  },
  props: {
    value: {
      type: [String, Number],
    },
  },
  computed: {
    ...mapState(['cabinetTimeout']),
  },
  methods: {
    change(val) {
      // 记录滚动条高度
      this.$set(this.navList[this.value], 'pos', window.scrollY);
      this.$emit('change', val);
      this.$nextTick(() => {
        // 恢复滚动条高度
        window.scrollTo(0, this.navList[val].pos);
      });
    },
  },
};
</script>

<style lang="less">
.bottom-nav- {
  &container {
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
    height: 44px;
    background-color: transparent;
    .mu-bottom-item {
      min-width: 75px;
    }
  }
  &bg {
    position: absolute;
    bottom: 0;
    height: 60px;
    min-width: 100%;
    pointer-events: none;
  }
  &ripple {
    ~ * {
      pointer-events: none;
    }
  }
  &icon {
    position: relative;
    display: inline-block;
    margin-bottom: 2px;
    height: 18px;
    img {
      height: 100%;
      vertical-align: middle;
      &.big-icon {
        transform: scale(1.6);
        transform-origin: 50% 80%;
        &.active-icon {
          transform: scale(1.9);
          transform-origin: 50% 60%;
        }
      }
    }
    &.with-badge::after {
      right: -30%;
      top: -30%;
    }
  }
  &text {
    transform: scale(0.8);
    color: rgba(255, 255, 255, 0.8);
  }
}
</style>
