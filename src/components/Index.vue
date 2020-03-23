<template>
    <div class="hold-transition layout-top-nav">
      <div class="wrapper">
          <nav class="main-header navbar navbar-expand navbar-info text-center">
            <div class="container">
                <h2 class="text-white">COVID-19 Monitoring</h2>
            </div>
          </nav>

          <div class="content-wrapper bg-dark">
            <div class="content">
              <div class="container bg-white">
                <div class="container">
                  <div class="row" style="margin-left:15%">
                    <div class="col-lg-3 col-12 mt-3">
                      <!-- small box -->
                      <div class="small-box text-white" style="background-color:#ff4d4d">
                        <div class="inner">
                          <h4>{{ formatPrice(message.cases) }} </h4>
                          <p>Cases</p> 
                        </div>
                          <img src="@/assets/doctors_bag.png" style="right:15px;top:10px;position:absolute">
                      </div>
                    </div>
                    <div class="col-lg-3 col-12 mt-3">
                      <!-- small box -->
                      <div class="small-box bg-success">
                        <div class="inner">
                         <h4>{{ formatPrice(message.deaths) }} </h4>
                          <p>Deaths</p> 
                        </div>
                         <img src="@/assets/empty_bed.png" style="right:15px;top:10px;position:absolute">
                      </div>
                    </div>
                    <div class="col-lg-3 col-12 mt-3">
                      <!-- small box -->
                      <div class="small-box text-white">
                        <div class="inner" style="background-color:#00cc99">
                          <h4>{{ formatPrice(message.recovered) }} </h4>
                          <p>Recovered</p> 
                        </div>
                         <img src="@/assets/recovery.png" style="right:15px;top:10px;position:absolute">
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
import MoneyFormat from 'vue-money-format'
export default {
    data(){
      return {
        message: {
          cases: "",
          deaths: "",
        }
      }  
    },
    methods: {
      allData() {
        axios.get('https://corona.lmao.ninja/all').catch(err => console.log(err)).then(data => {
            this.message = data.data;
        })
      },
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
