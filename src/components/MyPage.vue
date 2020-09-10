<template>
  <div class="my-page-container" :class="{'my-page-container-width-appbar': WithAppBar}">
    <MyAppBar class="my-page-app-bar" :hasBack="hasBack" :hasHome="hasHome" :title="title" v-if="WithAppBar">
      <slot name="right-actions" slot="right"></slot>
    </MyAppBar>
    <div class="my-page" :class="pageClass">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import MyAppBar from './MyAppBar.vue';

export default {
  components: {
    MyAppBar,
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
    pageClass: {
      type: String,
      default: '',
    },
  },
  watch: {
    title() {
      this.setTitle();
    },
  },
  created() {
    this.setTitle();
  },
  methods: {
    setTitle() {
      if (!this.WithAppBar) {
        window.document.title = this.title;
      }
    },
  },
};
</script>

<style lang='less'>
.my-page-container {
  position: relative;
  &-width-appbar {
    padding-top: 56px;
  }
  .my-page-app-bar {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
