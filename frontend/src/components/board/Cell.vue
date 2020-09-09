<template>
  <div
    :class="{ white: stone <= -1, black: stone >= 1, selected: selected }"
    @click="$emit('click')"
  >
    <span v-if="selected || legal">■</span>
    <img
      v-if="stone === 2 || stone === -2"
      :src="require(`@/assets/king_${stone === 2 ? 'black' : 'white'}.png`)"
      alt="king"
    />
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
  text-align: center;
  img {
    width: 30px;
  }
}
span {
  color: rgb(114, 114, 114);
  margin: 0;
  font-size: 27px;
}
</style>
