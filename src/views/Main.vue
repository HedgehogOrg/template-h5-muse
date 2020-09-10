<template>
  <div>
    <MyPage class="page-home" v-loading="isLoading" data-mu-loading-class="fixed-loading" :title="AppName" :hasBack="false">
      <div>main</div>
    </MyPage>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MyPage from '../components/MyPage.vue';

export default {
  name: 'Main',
  components: {
    MyPage,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState({
    }),
  },
  created() {
  },
  methods: {
    ...mapMutations([]),
  },
};
</script>
<style lang="less">
.page-home {
  padding-bottom: 70px;
  .home-mail {
    position: relative;
    &-icon {
      width: 24px;
    }
    &.with-badge::after {
      right: 10%;
      top: 10%;
    }
  }
}
</style>
