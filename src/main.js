import Vue from 'vue'
import App from './App.vue'
import './assets/main.styl'
import Icon from '@/components/Icon'

Vue.config.productionTip = false

// Register globally
Vue.component('Icon', Icon)
Vue.prototype.$http = 'contact-list-vuejs'

new Vue({
  render: h => h(App)
}).$mount('#app')
