<template>
    <div class="hold-transition layout-top-nav">
      <div class="wrapper">
          <nav class="main-header navbar navbar-expand navbar-info">
            <div class="container">
                <center><h2 class="text-white">COVID-19 Monitoring</h2></center>
            </div>
          </nav>

          <div class="content-wrapper">
            <div class="content">
              <div class="container bg-white">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-3 col-6 mt-3">
                      <!-- small box -->
                      <div class="small-box bg-info">
                        <div class="inner">
                          <h3> <money v-model="message.cases" v-bind="money"></money>{{ message.cases }}</h3>{{ message.cases }}

                          <p>New Orders</p>
                        </div>
                        <div class="icon">
                          <i class="ion ion-bag"></i>
                        </div>
                        <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>
                    <div class="col-lg-3 col-6 mt-3">
                      <!-- small box -->
                      <div class="small-box bg-success">
                        <div class="inner">
                          <h3>53<sup style="font-size: 20px">%</sup></h3>

                          <p>Bounce Rate</p>
                        </div>
                        <div class="icon">
                          <i class="ion ion-stats-bars"></i>
                        </div>
                        <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>
                    <div class="col-lg-3 col-6 mt-3">
                      <!-- small box -->
                      <div class="small-box bg-warning">
                        <div class="inner">
                          <h3>44</h3>

                          <p>User Registrations</p>
                        </div>
                        <div class="icon">
                          <i class="ion ion-person-add"></i>
                        </div>
                        <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
</template>

<style scoped>
@import 'admin-lte/dist/css/adminlte.css';
</style>

<script>
  import axios from 'axios'
import VueAxios from 'vue-axios'
 import {Money} from 'v-money'
export default {
      components: {Money},
    data() {
      return {
        message: {
          cases: "",
          money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          suffix: ' #',
          precision: 2,
          masked: false
        }
        }
      }  
    },
    methods: {
      allData() {
        axios.get('https://corona.lmao.ninja/all').catch(err => console.log(err)).then(data => {
            this.message = data.data;
        })
      }
    },
    mounted(){
      this.allData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
