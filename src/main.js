import Vue from 'vue'
import App from './App.vue'

import './assets/main.styl'

Vue.config.productionTip = false

// Using as Global for LocalStorage Key
Vue.prototype.$http = 'contact-list-vuejs'

new Vue({
  render: h => h(App)
}).$mount('#app')
