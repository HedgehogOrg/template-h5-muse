<template>
  <mu-button v-bind="$attrs" v-on="$listeners" flat class="my-button" :class="{'my-button-major': major, 'my-button-full': full}">
    <slot></slot>
  </mu-button>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: {
    major: {
      type: Boolean,
      default: false,
    },
    full: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../common/common.less");

.my-button {
  height: 38px;
  background-color: #fff;
  border-radius: 30px;
  border: 1px solid #e2e2e2;
  color: #666;
  &.mu-button-small {
    height: 32px;
  }
  &.mu-button-large {
    height: 43px;
  }
  &-major {
    background-color: @majorColor;
    color: #fff;
    border-color: @majorColor;
  }
  &-full {
    width: 100%;
  }
}
</style>
