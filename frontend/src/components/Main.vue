<template>
  <main>
    <div class="center">
      <p>
        <a
          class="btn-border"
          @click="reset"
        >リセット</a>
      </p>
      <!-- <TopPanel /> -->
      <span>{{ message ? message : turn }}</span>
      <Board
        ref="board"
        :game="game"
        :selected="selected"
        @select="select"
      />
      <select
        id="turn"
        name="turn"
        @change="selectTurn"
      >
        <option value="black">黒番で戦う</option>
        <option value="white">白番で戦う</option>
      </select>
    </div>
  </main>
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
      message: '',
      playerColor: 1,
      AIcolor: -1,
    }
  },
  computed: {
    turn() {
      return this.game.turn === 1 ? '先手番です' : '後手番です'
    },
  },
  methods: {
    AImove(data) {
      try {
        this.game.moveDVec(data.si, data.sj, [data.di, data.dj])
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
      let state
      try {
        console.log(si, sj, d)
        state = this.game.moveDVec(si, sj, d)
        this.$forceUpdate()
        console.log(this.game.board)
      } catch (e) {
        console.log(this.game.board)
        console.log(e)
        this.selected = null
        return
      }
      this.selected = null
      if (state === 1) {
        this.message = '先手勝利です'
      } else if (state === -1) {
        this.message = '後手勝利です'
      }
      if (this.game.turn === this.AIcolor) {
        this.getMove().done(this.AImove)
      }
    },
    reset() {
      this.game = new GameState()
      this.message = ''
      if (this.game.turn == this.AIcolor) {
        this.getMove().done(this.AImove)
      }
    },
    selectTurn(event) {
      const color = event.target.value === 'black' ? 1 : -1
      this.playerColor = color
      this.AIcolor = this.playerColor * -1
      console.log('the player color is ' + color)
      this.reset()
    },
  },
}
</script>
<style lang="scss" scoped>
.center {
  text-align: center;
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
  margin: 10px;
  border-radius: 4px;
  transition: 0.4s;
}

.btn-border:hover {
  background-color: #037003;
  border-color: #037003;
  color: #fff;
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
}
</style>
