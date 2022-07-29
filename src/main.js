import { createApp }  from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faBarsProgress,
    faGrip,
    faRotate,
    faPlusCircle,
    faFolder,
    faChevronLeft,
    faChevronRight,
    faChevronUp,
    faChevronDown,
    faFileCircleCheck,
    faBars,
    faTrashCan,
    faCircleXmark,
    faLanguage,
    faFile,
    faTriangleExclamation,
    faChartLine,
    faSave,
    faWifi, faExternalLinkAlt, faCoffee
} from '@fortawesome/free-solid-svg-icons'
import {faPaypal, faStripe} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add( faStripe, faCoffee, faPaypal, faExternalLinkAlt, faWifi, faSave, faBarsProgress, faGrip, faRotate, faPlusCircle, faCircleXmark, faFolder, faChevronLeft, faChevronRight, faChevronUp, faChevronDown, faFileCircleCheck, faBars, faTrashCan, faLanguage, faFile, faTriangleExclamation, faChartLine)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(createPinia())
    .use(router)
    .use(Notifications)
    .mount('#app')
