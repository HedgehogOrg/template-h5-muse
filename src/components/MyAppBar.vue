<template>
  <mu-appbar class="app-bar" color="primary" z-depth="0">
    <mu-button icon slot="left" v-if="hasBack" @click="back">
      <img src="../assets/images/icon_back_72x72.png" class="app-bar-back">
    </mu-button>
    <mu-button icon slot="left" v-if="hasHome" @click="home">
      <img src="../assets/images/icon_home_64x64.png" class="app-bar-back">
    </mu-button>
    <h1 class="app-bar-title">{{title}}</h1>
    <slot name="right" slot="right"></slot>
  </mu-appbar>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: {
    hasBack: {
      type: Boolean,
      default: true,
    },
    hasHome: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    home() {
      this.$router.replace('/');
    },
  },
};
</script>

<style scoped lang="less">
.app-bar {
  position: relative;
  &-back {
    height: 24px;
  }
  &-title {
    position: absolute;
    top: 0;
    left: 60px;
    right: 60px;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    line-height: normal;
  }
}
</style>
