<template>
  <div class="board">
    <div v-for="(row, i) in game.board" :key="i" class="container">
      <div v-for="(s, j) in row" :key="j" class="frame">
        <Cell
          :stone="s"
          :selected="selected && i === selected[0] && j === selected[1]"
          :legal="isLegal(i, j)"
          @click="_select(i, j)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { GameState } from "@/game_state"
export default {
  components: {
    Cell: () => import("./Cell"),
  },
  props: {
    game: GameState,
    selected: {
      type: Array,
      default: null,
    },
  },
  methods: {
    _select(i, j) {
      this.$emit("select", i, j)
      this.$forceUpdate()
    },
    isLegal(i, j) {
      if (!this.selected) return false
      const [si, sj] = this.selected
      return this.game.isLegalMove(si, sj, [i - si, j - sj])
    },
  },
}
</script>
<style lang="scss" scoped>
.board {
  margin: 10px;
}
.container {
  display: flex;
  justify-content: center;
}
.frame {
  border: 1px solid black;
  background-color: rgb(180, 151, 21);
}
</style>
