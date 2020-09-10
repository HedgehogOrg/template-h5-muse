<template>
  <div id="app">
    <keep-alive :include="$store.state.keepAlive.keepAlivePages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState([]),
  },
  async created() {
    // 隐藏html loading
    const loading = document.querySelector('#loading');
    if (loading) loading.classList.add('hidden');
  },
  mounted() {
  },
  methods: {
    ...mapMutations([]),
  },
};
</script>

<style lang="less">
@import url("common/common.css");
</style>
