<template>
  <div class="wrap"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    time() {
      return this.base.GetTime();
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  border: 1px solid white;
}
</style>