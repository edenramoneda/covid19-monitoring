/* eslint-disable */ 
import Router from 'vue-router'
import Index from '@/components/Index'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import VueAdminLte from '@cookieseater/vue-adminlte3'

//Vue.use(VueAdminLte, {/* options */});
import HighchartsVue from 'highcharts-vue'

Vue.use(HighchartsVue, {tagName: 'charts'})
Vue.use(Router)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// Vue.use(axios)
// Vue.use(VueAxios)
// Vue.use(MoneyFormat)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
