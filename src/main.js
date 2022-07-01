import { createApp }  from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faUserSecret,
    faBuilding,
    faBarsProgress,
    faGrip,
    faRotate,
    faPlusCircle,
    faFolder,
    faFolderTree,
    faFolderPlus,
    faChevronLeft,
    faChevronRight,
    faChevronUp,
    faChevronDown,
    faFileCircleCheck, faBars, faTrashCan, faCircleXmark
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faBuilding, faBarsProgress, faGrip, faRotate, faPlusCircle, faCircleXmark, faFolder, faFolderTree, faFolderPlus, faChevronLeft, faChevronRight, faChevronUp, faChevronDown, faFileCircleCheck, faBars, faTrashCan)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(store)
    .use(router)
    .mount('#app')
