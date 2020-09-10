<template>
  <mu-flex class="my-input-container" align-items="center">
    <slot name="prepend"></slot>
    <input type="text" class="my-input" v-bind="$attrs" v-on="$listeners" @blur="$fixWechatKeybordBug" ref="input">
    <slot name="append"></slot>
  </mu-flex>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: {
    focus: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.focus) {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
  },
  methods: {
  },
};
</script>

<style scoped lang="less">
.my-input-container {
  height: 32px;
  border: 1px solid #e3e3e3;
  border-radius: 50px;
  background-color: #fff;
  .my-input {
    display: block;
    flex: 1;
    padding: 0;
    margin: 0 15px;
    height: 20px;
    outline: none;
    border: none;
    background-color: transparent;
    color: #333;
    &::placeholder {
      color: #999;
    }
  }
}
</style>
