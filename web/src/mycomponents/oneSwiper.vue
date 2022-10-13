<template>
  <div class="swiper" @mouseover="over" @mouseleave="leave">
    <div class="swiper-wrapper">
      <div class="swiper-slide"><img
        src="https://p1.music.126.net/dPbrJrqz7NkyAAT7_VrobQ==/109951167910227751.jpg?imageView&quality=89" alt="">
      </div>
      <div class="swiper-slide"><img
        src="https://p1.music.126.net/tR939G_a4tBKxT_cREx4WA==/109951167910212919.jpg?imageView&quality=89" alt="">
      </div>
      <div class="swiper-slide"><img
        src="https://p1.music.126.net/NlamHrVcmTU1oQVNZbSk3Q==/109951167910226366.jpg?imageView&quality=89" alt="">
      </div>
      <div class="swiper-slide"><img
        src="https://p1.music.126.net/9Hi4LhNMl-T-6UJMx8mYIA==/109951167910232337.jpg?imageView&quality=89" alt="">
      </div>
      <div class="swiper-slide"><img
        src="https://p1.music.126.net/DeRHQu61-Y_vbQK3-lCmIA==/109951167910792262.jpg?imageView&quality=89" alt="">
      </div>
      <div class="swiper-slide"><img
        src="https://p1.music.126.net/_7DLwMLGOx3ApEWy9nCBkg==/109951167910245692.jpg?imageView&quality=89" alt="">
      </div>
      <div class="swiper-slide"><img
        src="https://p1.music.126.net/o0rWz14wMg91goAxoiTB1g==/109951167910437806.jpg?imageView&quality=89" alt="">
      </div>
      <div class="swiper-slide"><img
        src="https://p1.music.126.net/tR939G_a4tBKxT_cREx4WA==/109951167910212919.jpg?imageView&quality=89" alt="">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div v-show="put">
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>

  </div>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

export default {
  data () {
    return {
      put: false
    }
  },
  methods: {
    over: function () {
      this.put = true
    },
    leave: function () {
      this.put = false
    }
  },
  name: 'oneSwiper',
  mounted () {
    var mySwiper = new Swiper('.swiper', {
      speed: 1000,
      grabCursor: true,
      slidesPerView: 2.8,
      spaceBetween: -20,
      centeredSlides: true,
      autoplay: {
        disableOnInteraction: false
      },
      on: {
        paginationRender: function () {
          const pages = document.getElementsByClassName('swiper-pagination-bullet')
          for (let i = 0; i < pages.length; i++) {
            pages[i].onmouseover = function (e) {
              e.target.click()
            }
          }
        }
      },
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet (index, className) {
          return `<span class="${className} swiper-pagination-bullet-bullets"></span>`
        }
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    })
  }
}
</script>

<style scoped lang="scss">
.swiper {
  //overflow: hidden;
  margin-top: -35px;
  margin-left: -5px;
  position: relative;
  width: 1153px;
  height: 280px;
  //background-color: pink;
  --swiper-theme-color: #ff6600; /* 设置Swiper风格 */
  --swiper-navigation-color: #00ff33; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 30px; /* 设置按钮大小 */
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  display: flex;
  align-items: center;
  transition: 300ms;
  transform: scale(0.6);
}

.swiper-slide-active, .swiper-slide-duplicate-active {
  transform: scale(0.82);
  z-index: 20;
}

.swiper-button-prev {
  margin-left: 35px;
}

.swiper-pagination {
  left: 50px;
  position: absolute;
  top: 257px;
}

img {
  border-radius: 20px;
  width: 600px;
  height: 250px;
}
</style>
