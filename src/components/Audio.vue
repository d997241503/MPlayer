<template>
  <div class="audio-wrapper">
    <div class="audio m-layout">
      <img class="pic" :src="song.pic" alt="">
      <div class="main">
        <h3 class="name">{{song.name}}<span style="font-size: 14px;padding-left: 10px">{{song.artist}}</span></h3>
        <div class="audio-box">
          <audio id="audioTag" :src="url"></audio>
          <div class="a-progress">
            <span class="played-time" id="playedTime">00:00</span>
            <div class="pgs-total">
              <div class="pgs-play" id="progress" style="width: 1%;"></div>
            </div>
            <span class="audio-time" id="audioTime">0</span>
          </div>
          <div class="a-controls">
            <button class="play-pause" id="playPause">
              <span class="icon-btn icon-play"></span>
            </button>
            <div id="skipForward" class="skip-ward s-right"></div>
            <div id="skipBackward" class="skip-ward s-left"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'


function transTime(time) {
		var duration = parseInt(time);
		var minute = parseInt(duration / 60);
		var sec = duration % 60 + '';
		var isM0 = ':';
		if (minute == 0) {
			minute = '00';
		} else if (minute < 10) {
			minute = '0' + minute;
		}
		if (sec.length == 1) {
			sec = '0' + sec;
		}
		return minute + isM0 + sec
	}
	// 更新进度条
	function updateProgress() {
		var audio = document.getElementById('audioTag');
		var value = Math.round((Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100, 0);
		$('#progress').css('width', value * 1 + '%');
		$('#playedTime').html(transTime(audio.currentTime));
	}
	// 播放完成
	function audioEnded() {
		var audio = document.getElementById('audioTag');
		audio.currentTime = 0;
		audio.pause();
		$('#playPause>span').removeClass('icon-pause').addClass('icon-play');
	}
	// 快进快退
	function skipWard(value) {
		var audio = document.getElementById('audioTag');
		if (audio.currentTime + value >= audio.duration) {
			audio.currentTime = audio.duration;
		} else if (audio.currentTime + value <= 0) {
			audio.currentTime = 0;
		} else {
			audio.currentTime += value;
		}
	}

export default {
  name:'',
  data() {
    return {
      song: {},
      url: '',
      audio: {}
    }
  },
  created() {
    this.$bus.$on('play', (item) => {
      if (item.id === this.song.id) return
      this.song = item;
      this.$http.get('/song/url', {
        params: {
          id: this.song.id
        }
      }).then((res) => {
        this.url = res.data.data[0].url;
        this.$nextTick(() => {
          this.audio.play();
          $('.icon-btn').removeClass('icon-play').addClass('icon-pause');
        })
      })
    })
  },
  mounted() {
    var audio = $('#audioTag').get(0);
    this.audio = audio;
    audio.addEventListener('timeupdate', updateProgress, false); // 监听音频播放时间并更新进度条
    audio.addEventListener('ended', audioEnded, false); // 监听播放完成事件
    $('.pgs-total').on('click', function(e) {
      var W = $(this).width();
      var place = e.offsetX;
      audio.currentTime = (place / W) * audio.duration;
      $(this).children().css({width: (place / W) * 100 + "%"});
      updateProgress();
    })
    $('#playPause').click(function () {
      if (!audio.currentSrc) {
        return
      }
      // 改变暂停/播放icon
      if (audio.paused) {
        audio.play();
        $('.icon-btn').removeClass('icon-play').addClass('icon-pause');
      } else {
        audio.pause();
        $('.icon-btn').removeClass('icon-pause').addClass('icon-play');
      }
    })
    $('#audioTag').on("loadedmetadata", function () {
      $('#audioTime').text(transTime(this.duration));
    });
    $('#skipForward').on('click', function (e) {
      if (!audio.currentSrc) {
        return
      }
      skipWard(15);
      updateProgress();
    });
    $('#skipBackward').on('click', function (e) {
      if (!audio.currentSrc) {
        return
      }
      skipWard(-15);
      updateProgress();
    });
  }
}
</script>

<style lang="less" scoped>
.audio-wrapper {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 10;
  background-color: rgb(225, 243, 255);
}
.audio {
  width: 1200px;
  display: flex;
  align-items: center;
  .pic {
    width: 100px;
    height: 100px;
  }
  .main {
    width: calc(100% - 100px);
    .name {
      padding-top: 5px;
      font-size: 20px;
    }
  }
}

.audio-box {
  margin: 0 auto;
  bottom: 0;
  left: 0;
  right: 0;
}
.a-progress {
  width: 100%;
  margin: 8px auto;
  position: relative;
  padding: 0 65px;
  color: #3fcccc;
  box-sizing: border-box;
}
.a-progress > span {
  width: 50px;
  position: absolute;
  top: -1px;
}
.a-progress .played-time {
  left: 15px;
  text-align: left;
}
.a-progress .audio-time {
  right: 15px;
  text-align: right;
}
.a-progress .pgs-total {
  width: 100%;
  height: 16px;
  background-color: transparent;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
}
.a-progress .pgs-total:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 7px;
  bottom: 7px;
  background-color: #bbbbbb;
  border-radius: 10px;
  z-index: 0;
}
.a-progress .pgs-total .pgs-play {
  height: 100%;
  position: relative;
  border-radius: 10px;
}
.a-progress .pgs-total .pgs-play:before {
  content: '';
  position: absolute;
  top: 7px;
  bottom: 7px;
  left: 0;
  right: 0;
  background-color: #3fcccc;
  border-radius: 10px;
  z-index: 1;
}
.a-progress .pgs-total .pgs-play:after {
  content: '';
  position: absolute;
  right: -8px;
  width: 16px;
  height: 16px;
  top: 50%;
  margin-top: -8px;
  background-color: #3fcccc;
  border-radius: 50%;
  z-index: 1;
}
.a-controls {
  width: 100%;
  padding: 0;
  position: relative;
  text-align: center;
}
.a-controls .play-pause {
  border: 0;
  outline: 0;
  padding: 0;
  width: 60px;
  height: 60px;
  margin: 0 28px;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
}
.a-controls .play-pause .icon-btn {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.a-controls .play-pause .icon-play {
  background: url("../assets/play.png");
  background-size: 100% 100%;
}
.a-controls .play-pause .icon-pause {
  background: url("../assets/pause.png");
  background-size: 100% 100%;
}
.a-controls .skip-ward {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  margin-top: -15px;
  border-radius: 50%;
  overflow: hidden;
}
.a-controls .s-left {
  left: 25%;
  background: url("../assets/left.png");
  background-size: 100% 100%;
  cursor: pointer;
}
.a-controls .s-right {
  right: 25%;
  background: url("../assets/right.png");
  background-size: 100% 100%;
  cursor: pointer;
}


</style>