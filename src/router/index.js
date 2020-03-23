
import Router from 'vue-router'
import Index from '@/components/Index'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import money from 'v-money'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

 

//import VueAdminLte from '@cookieseater/vue-adminlte3'

//Vue.use(VueAdminLte, {/* options */});

Vue.use(Router)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
