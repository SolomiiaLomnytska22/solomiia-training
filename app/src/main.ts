import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faMagnifyingGlass,
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle,
  faCircleXmark,
  faPlus,
  faPencil,
  faTrashCan,
  faSortUp,
  faSortDown,
  faSort
} from '@fortawesome/free-solid-svg-icons'
import {
  faInstagram,
  faLinkedin,
  faXTwitter
} from '@fortawesome/free-brands-svg-icons'

library.add(
    faMagnifyingGlass,
  faCheckCircle,
  faCircleXmark,
  faInfoCircle,
  faExclamationTriangle,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faPlus,
  faPencil,
  faTrashCan,
  faSortUp,
  faSortDown,
  faSort
)
import TooltipDirective from './directives/TooltipDirective'

Vue.directive('tooltip', TooltipDirective)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router: router
}).$mount('#app')
