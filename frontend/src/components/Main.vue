<template>
  <div class="center">
    <!-- <TopPanel /> -->
    <span>{{ state === 0 ? turn : message }}</span>
    <Board ref="board" :game="game" :selected="selected" @select="select" />
    <select id="turn" name="turn" @change="selectTurn">
      <option value="black">黒番でAIと戦う</option>
      <option value="white">白番でAIと戦う</option>
      <option value="off">AI off</option>
    </select>
    <a class="btn-border" @click="reset">リセット</a>
  </div>
</template>
<script>
import { GameState } from '@/game_state'
var $ = require('jquery')
export default {
  components: {
    // TopPanel: () => import("./board/TopPanel"),
    Board: () => import('./board/Board'),
  },
  data() {
    return {
      game: new GameState(),
      selected: null,
      playerColor: 1,
      AIcolor: -1,
      state: 0,
    }
  },
  computed: {
    turn() {
      if (this.game.turn === this.AIcolor) return 'AIが考慮中です'
      return this.game.turn === 1 ? '先手番です' : '後手番です'
    },
    message() {
      if (this.state === 1) {
        return '先手勝利です'
      } else if (this.state === -1) {
        return '後手勝利です'
      }
      return ''
    },
  },
  methods: {
    AImove(data) {
      try {
        this.state = this.game.moveDVec(data.si, data.sj, [data.di, data.dj])
      } catch (e) {
        console.log(e)
        alert('An error occured.')
        this.reset()
      }
      this.$refs.board.$forceUpdate()
    },
    // 非同期
    getMove() {
      return $.ajax({
        type: 'POST',
        url: '/post',
        data: JSON.stringify({ game: this.game }),
        contentType: 'application/json',
        //async: false,
      })
    },
    select(i, j) {
      if (this.game.turn === this.AIcolor) return
      if (!this.selected) {
        if (this.game.board[i][j] != this.game.turn) return
        this.selected = [i, j]
        return
      }
      const [si, sj] = this.selected
      const d = [i - si, j - sj]
      if (d[0] === 0 && d[1] === 0) {
        this.selected = null
        return
      }
      try {
        this.state = this.game.moveDVec(si, sj, d)
        this.$forceUpdate()
      } catch (e) {
        this.selected = null
        return
      }
      this.selected = null

      if (this.state === 0 && this.game.turn === this.AIcolor) {
        this.getMove().done(this.AImove)
      }
    },
    reset() {
      this.game = new GameState()
      this.state = 0
      if (this.game.turn === this.AIcolor) {
        this.getMove().done(this.AImove)
      }
    },
    selectTurn(event) {
      const color =
        event.target.value === 'black'
          ? 1
          : event.target.value === 'white'
          ? -1
          : 0
      this.AIcolor = color * -1
      this.reset()
    },
  },
}
</script>
<style lang="scss" scoped>
.center {
  text-align: center;
  padding: 20px;
  flex-grow: 1;
  // flex-basis: 30%;
}
.btn-border {
  display: inline-block;
  max-width: 180px;
  text-align: left;
  border: 2px solid #037003;
  font-size: 16px;
  color: #037003;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 4px;
  transition: 0.4s;
  background-color: #e6e6e6;
  &:hover {
    background-color: #037003;
    border-color: #037003;
    color: #fff;
  }
}

select {
  display: inline-block;
  max-width: 180px;
  text-align: left;
  border: 2px solid #037003;
  font-size: 16px;
  color: #037003;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 16px;
  margin: 10px;
  border-radius: 4px;
  transition: 0.4s;
  background-color: #e6e6e6;
}
</style>
