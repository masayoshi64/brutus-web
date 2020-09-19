<template>
  <div class="how-to-play-wrapper">
    <h2>BRUTUSとは</h2>
    <p>
      BRUTUSは浅民氏(
      <a
        href="https://twitter.com/asatamin0611"
        target="_blank"
        rel="noopener noreferrer"
      >
        twitter</a
      >
      )によって制作されたボードゲームでチェスとオセロを組み合わせたようなものになっています。
      コマ同士を挟むと相手のコマを自分のコマに裏切らせることができ，ここからブルータスと言う名前が名付けられました。
    </p>
    <h2>ルール</h2>
    <p>
      駒は王将以外は前後左右と斜めに動くことができ，
      さらに初手以外は2マス前へ進むことができます。
      また，相手の駒が自分の駒の前にいるときはその駒を飛び越えて進むことができます。
      ただし，自分や相手の駒のいるところには進むことができません(取ることはできません)。
      進んだ先で，オセロのように相手の駒を返すことができます。
    </p>
    <p>
      相手の王将の前と左右の3マスに自分の駒がある状態で相手がその駒を寝返らせることができなかった場合に勝利となります。
    </p>
    <h2>ルール説明・遊び方の動画</h2>
    <div class="player">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/ZGVpPtTp63k"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
    <h2>AIについて</h2>
    <p>
      AIは<a href="https://techexpo-apphys.com/">工学博覧会2020</a
      >の企画として作成されました。AIの仕組みについて詳しく知りたい方は工学博覧会2020のHPにて説明しております。
      またライブ配信を<strong>20日(日)14:30〜・21日(月)13:30〜</strong>に予定しておりますので，そちらも是非ご覧ください(
      <a href="https://techexpo-apphys.com/">HP</a>に掲示予定です)！
    </p>
  </div>
</template>
<style lang="scss" scoped>
.how-to-play-wrapper {
  margin: 10px;
  padding: 20px;
  flex-grow: 3;
  // flex-basis: 70%;
  background-color: #ffffff;
  border-radius: 35px;
  p {
    margin: 10px;
  }
  h2 {
    margin: 30px 0 20px 10px;
  }
}
.player {
  text-align: center;
  iframe {
    max-width: 80vw;
    max-height: calc(80vw * 315 / 560);
  }
}
</style>
