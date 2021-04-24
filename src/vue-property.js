import Vue from 'vue'
import axios from '@/api'

Vue.prototype.$http = axios
Vue.prototype.$bus = new Vue()