import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle, faCircleXmark, faInfoCircle, faExclamationTriangle)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.config.productionTip = false
new Vue({
  render: (h) => h(App),
  router: router
}).$mount('#app')
