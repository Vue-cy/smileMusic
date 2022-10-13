<template>
  <div class="top">
    <div class="icon">
      <i class="iconfont icon-xiaolian"></i>
    </div>
    <span class="smile">笑脸音乐</span>
  </div>
</template>

<script>
export default {
  name: 'headTabOne'
}
</script>

<style scoped>

.icon-xiaolian {
  font-size: 2.3rem;
  height: 70px;
  line-height: 70px;
}

.smile {
  margin-left: 15px;
  height: 70px;
  line-height: 70px;
  color: white;
  font-size: 1.5625rem;
  font-weight: bold;
}

.smile:before:hover {
  transform: rotate(720deg);
}

.icon {
  margin-left: 30px;
}

.top {
  z-index: 300;
  top: 0;
  display: flex;
  width: 100%;
  height: 70px;
  background-image: linear-gradient(to right, wheat, dodgerblue, red, dodgerblue);
  position: fixed;
  background-size: 400%;
  animation: color 10s infinite;
}

@keyframes color {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 50% 0;
  }
  100% {
    background-position: 100% 0;
  }
}
</style>
