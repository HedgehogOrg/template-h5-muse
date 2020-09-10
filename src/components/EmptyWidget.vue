<template>
  <div class="empty-widget">
    <img src="../assets/images/icon_empty_400x400.png" class="empty-widget-img">
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang='less' scoped>
.empty-widget {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #999;
  &-img {
    width: 125px;
  }
}
</style>
