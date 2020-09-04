<template>
  <div
    :class="{ white: stone <= -1, black: stone >= 1, selected: selected }"
    @click="$emit('click')"
  >
    <span v-if="selected || legal">★</span>
  </div>
</template>
<script>
export default {
  props: {
    stone: {
      type: Number,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    legal: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss" scoped>
.white {
  border-radius: 35px;
  background-color: white;
}
.black {
  border-radius: 35px;
  background-color: black;
}
div {
  min-width: 35px;
  min-height: 35px;
}
span {
  color: green;
  margin: auto;
}
</style>
