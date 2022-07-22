import { createApp }  from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

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
    faWifi, faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add( faExternalLinkAlt, faWifi, faSave, faBarsProgress, faGrip, faRotate, faPlusCircle, faCircleXmark, faFolder, faChevronLeft, faChevronRight, faChevronUp, faChevronDown, faFileCircleCheck, faBars, faTrashCan, faLanguage, faFile, faTriangleExclamation, faChartLine)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(createPinia())
    .use(router)
    .mount('#app')
