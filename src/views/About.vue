<template>
  <div class="textBlock">
    <h1>About</h1>
    <p>DnD Roller is a dice-rolling app to help you have more fun playing Dungeons and Dragons (or any
      tabletop RPG really). You can register an account and create and save custom rolls for weapons and attacks. You can also create and join rooms allowing the entire party to see everybody's rolls.</p>
    <p>Version 2.0.2</p>
    <img id="myPic" src="@/assets/doug.jpg">
    <p>Made by <a href="https://doug-may.github.io/" target="_blank"><span class="redirect">Doug May</span></a><br>
    dougrobertmay@gmail.com</p>

    <div id="donations">
      <div class="item">
        <img src="@/assets/Bitcoin.png" alt="">
        <p>34xiaGcdZ1RGZPmwh6cEWdnqDEiy884SGX</p>
      </div>
      <div class="item">
        <img src="@/assets/Ethereum.png" alt="">
        <p>0xbD26A6B9BF767cD8C54975c09D5fB77ed97EE45D</p>
      </div>
      <div class="item">
        <img src="@/assets/Litecoin.png" alt="">
        <p>MGRb5ujuigMXHEBpdhXYxToosiJa3guxpU</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#myPic {
  border-radius: 10px;
}
#donations {
  margin-top: 30px;
  margin-bottom: 80px;
}
#donations img {
  width: 20px;
  margin-right: 5px;
  margin-bottom: -5px;
}
#donations p {
  font-size: 8px;
  display: inline-block;
}
.item{
  margin: -6px 0px;
}
</style>
