<template>
  <div id="app">
    <Header />
    <Main />
  </div>
</template>
<script>
export default {
  name: "App",
  components: {
    Header: () => import("@/components/Header"),
    Main: () => import("@/components/Main"),
  },
  mounted() {
    document.title = "BRUTUS AI | 工学博覧会2020"
  },
}
</script>
