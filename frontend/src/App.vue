<template>
  <div id="app">
    <Header />
    <div class="wrapper">
      <Main />
      <HowToPlay />
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {
    Header: () => import('@/components/Header'),
    Main: () => import('@/components/Main'),
    HowToPlay: () => import('@/components/HowToPlay'),
  },
  mounted() {
    document.title = 'BRUTUS AI | 工学博覧会2020'
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  max-width: 900px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
