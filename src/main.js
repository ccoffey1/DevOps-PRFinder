import Vue from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCopy,
  faEdit,
  faSave,
  faUndo,
  faTimesCircle,
  faExclamationTriangle,
  faSync
} from '@fortawesome/free-solid-svg-icons'

Vue.config.productionTip = false

library.add(
  faCopy,
  faEdit,
  faSave,
  faUndo,
  faTimesCircle,
  faExclamationTriangle,
  faSync
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: h => h(App)
}).$mount('#app')
