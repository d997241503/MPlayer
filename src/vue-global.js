import Vue from 'vue'

Vue.filter('songTime', function (value) {
  if (!value) return ''
  let minutes = Math.floor((value % 3600000) / 60000); //分
  let seconds = Math.floor((value % 60000) / 1000); //秒
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  return `${minutes}:${seconds}`
})