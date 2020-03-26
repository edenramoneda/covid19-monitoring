/* eslint-disable */ 

require("mdbvue/lib/css/mdb.min.css");
require("@fortawesome/fontawesome-free/css/all.min.css");
import Router from 'vue-router'
import Index from '@/components/Index'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import VueAdminLte from '@cookieseater/vue-adminlte3'

//Vue.use(VueAdminLte, {/* options */});
import Highcharts from "highcharts";
import Highcharts3d from "highcharts/highcharts-3d";
import HighchartsVue from 'highcharts-vue'
import { VuejsDatatableFactory } from 'vuejs-datatable';
import * as mdbvue from 'mdbvue'
for (const component in mdbvue) {
  Vue.component(component, mdbvue[component])
}
Vue.use( VuejsDatatableFactory );
Highcharts3d(Highcharts);
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
      component: Index,
      meta: {
        auth: false,
        title: 'Rams Covid-19 Tracker'
      }
    }
  ]
})
