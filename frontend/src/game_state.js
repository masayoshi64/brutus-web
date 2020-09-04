// import { clone } from "./utils"
const Drc = {
  B_fr: 0,
  B_r: 1,
  B_br: 2,
  B_f: 3,
  B_b: 4,
  B_fl: 5,
  B_l: 6,
  B_bl: 7,
  f2: 8,
}
const Winner = {
  plus: 1,
  minus: -1,
  notEnded: 0,
}

const DIRECTIONS = [
  [-1, 1],
  [0, 1],
  [1, 1],
  [-1, 0],
  [1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
]

export class GameState {
  constructor() {
    this.board = [
      [-1, -1, -2, -1, -1],
      [0, -1, 0, -1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 1, 2, 1, 1],
    ]
    this.turn = 1
    this.n_turns = 0
  }
  directionize(drc) {
    if (drc === Drc.f2) {
      return this.turn === 1 ? [-2, 0] : [2, 0]
    }
    return DIRECTIONS[drc]
  }
  undirectionize(direction) {
    if (Math.abs(direction[0]) > 2 || Math.abs(direction[1]) > 1) {
      return null
    }
    if (direction[0] === 2 * this.turn) return null
    if (Math.abs(direction[0]) === 2 && direction[1] !== 0) return null
    let drc = DIRECTIONS.map((x) => x.toString()).indexOf(direction.toString())
    if (drc === -1) drc = Drc.f2
    return drc
  }
  isLegalMove(i, j, drc) {
    if (drc instanceof Array) {
      drc = this.undirectionize(drc)
      if (drc === null) return false
    }
    if (this.n_turns === 0 && drc === Drc.f2) {
      return false
    }
    if (this.board[i][j] !== this.turn) {
      return false
    }
    const direction = this.directionize(drc)
    const nxt = [i + direction[0], j + direction[1]]
    if (!boundaryCheck(nxt)) {
      return false
    }
    if (this.board[nxt[0]][nxt[1]] !== 0) {
      return false
    }
    return true
  }
  move(i, j, drc) {
    if (!this.isLegalMove(i, j, drc)) {
      throw new Error()
    }
    const direction = this.directionize(drc)
    const nxt = [i + direction[0], j + direction[1]]
    // const boardBeforeMove = clone(this.board)
    this.board[i][j] = 0
    this.board[nxt[0]][nxt[1]] = this.turn
    this.reverse(nxt)
    return this.turnChange()
  }
  moveWithId(action) {
    const i = Math.floor(action / 45)
    const tmp = action % 45
    const j = Math.floor(tmp / 9)
    const drc = tmp % 9
    return this.move(i, j, drc)
  }
  moveDVec(i, j, direction) {
    const drc = this.undirectionize(direction)
    if (drc === null) throw new Error()
    return this.move(i, j, drc)
  }
  reverse(ij) {
    for (const dirc of DIRECTIONS) {
      let pos = [ij[0] + dirc[0], ij[1] + dirc[1]]

      while (boundaryCheck(pos)) {
        const p = this.board[pos[0]][pos[1]]
        if (p === 0) {
          break
        } else if (p === this.turn || p === this.turn * 2) {
          pos = [pos[0] - dirc[0], pos[1] - dirc[1]]
          while (!(pos[0] === ij[0] && pos[1] === ij[1])) {
            if (this.board[pos[0]][pos[1]] !== this.turn * -2) {
              this.board[pos[0]][pos[1]] = this.turn
            }
            pos = [pos[0] - dirc[0], pos[1] - dirc[1]]
          }
          break
        }
        pos = [pos[0] + dirc[0], pos[1] + dirc[1]]
      }
    }
  }
  turnChange() {
    this.n_turns++
    this.turn *= -1
    return this.getWinner()
  }
  getWinner() {
    if (this.turn === -1) {
      if (
        this.board[6][1] === -1 ||
        this.board[6][3] === -1 ||
        this.board[5][2] === -1
      ) {
        return Winner.minus
      }
    } else {
      if (
        this.board[0][1] === 1 ||
        this.board[0][3] === 1 ||
        this.board[1][2] === 1
      ) {
        return Winner.plus
      }
    }
    return Winner.notEnded
  }
}

const boundaryCheck = (ij) => {
  const [i, j] = ij
  return 0 <= i && i <= 6 && 0 <= j && j <= 4
}
