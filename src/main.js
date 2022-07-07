import { createApp }  from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

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
    faFileCircleCheck, faBars, faTrashCan, faCircleXmark, faLanguage, faFile
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faBuilding, faBarsProgress, faGrip, faRotate, faPlusCircle, faCircleXmark, faFolder, faFolderTree, faFolderPlus, faChevronLeft, faChevronRight, faChevronUp, faChevronDown, faFileCircleCheck, faBars, faTrashCan, faLanguage, faFile)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(createPinia())
    .use(router)
    .mount('#app')
