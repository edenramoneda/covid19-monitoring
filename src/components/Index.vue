/* eslint-disable */ 
<template>
    <div class="hold-transition layout-top-nav">
      <div class="wrapper">
          <div class="content-wrapper custom-container">
            <div class="content">
              <div class="container custom-container-2">
                <h2 class="text-white text-center"><b>COVID-19</b> Analytics</h2>
                <h6 class="text-white text-center">Credits: <a href="https://github.com/NovelCOVID/API">https://github.com/NovelCOVID/API</a></h6><br>
                <div class="container-fluid">
                  <div class="row" style="margin-left:15%">
                    <div class="col-lg-3 col-12 mt-3">
                      <!-- small box -->
                      <div class="small-box text-white" style="background-color:#ff5050;">
                        <div class="inner">
                          <h4>{{ formatPrice(message.cases) }} </h4>
                          <p>Total Cases</p>
                        </div>
                          <img src="@/assets/doctors_bag.png" style="right:15px;top:10px;position:absolute">
                      </div>
                    </div>
                    <div class="col-lg-3 col-12 mt-3">
                      <!-- small box -->
                      <div class="small-box bg-success">
                        <div class="inner">
                         <h4>{{ formatPrice(message.deaths) }} </h4>
                          <p>Total Deaths</p>
                        </div>
                         <img src="@/assets/empty_bed.png" style="right:15px;top:10px;position:absolute">
                      </div>
                    </div>
                    <div class="col-lg-3 col-12 mt-3">
                      <!-- small box -->
                      <div class="small-box text-white">
                        <div class="inner" style="background-color:#00cc99">
                          <h4>{{ formatPrice(message.recovered) }} </h4>
                          <p>Total Recovered</p>
                        </div>
                         <img src="@/assets/recovery.png" style="right:15px;top:10px;position:absolute">
                      </div>
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-lg-6 col-12">
                      <charts :options="chartOptions" style="width:100%"></charts>
                    </div>
                     <div class="col-lg-6 col-12">
                      <charts :options="lineChart" style="width:100%"></charts>
                    </div>
                  </div><br><br>
                  <div class="row">
                    <div class="col-lg-12 col-12">
                      <div class="card">
                        <div class="card-body">
                        <mdb-container>
                            <mdb-datatable
                              :data="data"
                              striped
                              bordered
                              arrows
                              :display="3"
                            />
                          </mdb-container>
                        </div>
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
@import "admin-lte/dist/css/adminlte.css";

.custom-container {
  background-image:url('../assets/earth.jpg');
  background-repeat: no-repeat;
  height:100vh;
  width:100%;
  background-size: cover;
}
.custom-container-2 {
  
  height:100vh;
  background-color: transparent;
  -webkit-box-shadow: 0px -1px 11px 5px rgba(0, 0, 0, 0.73);
  -moz-box-shadow: 0px -1px 11px 5px rgba(0, 0, 0, 0.73);
  box-shadow: 0px -1px 11px 5px rgba(0, 0, 0, 0.73);
  height:100vh;
  overflow-y: scroll;
}

</style>

<script>
import axios from "axios";
import VueAxios from "vue-axios";
import MoneyFormat from "vue-money-format";
 import { mdbDatatable, mdbContainer } from 'mdbvue';
export default {
    components: {
    mdbDatatable,
    mdbContainer
  },
  data() {
    return {
      data: {

        columns:[
          {
            label: 'Country',
            field: 'country',
            sort:'asc',
          }
        ],
        rows:[],
              
      },

      message: {
        cases: "",
        deaths: "",
        recovered: ""
      },
      
      chartOptions: {
        chart: {
          type: "column"
          // options3d: {
          //   enabled: true,
          //   alpha: 45,
          // }
        },
        title: {
          text: "Top 10 countries w/ <b>many total deaths</b>"
        },
        xAxis: {
          categories: [],
          title: {
            text: "Countries"
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: "Total",
            align: "high"
          },
          labels: {
            overflow: "justify"
          }
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true
            }
          }
        },
        credits: {
          enabled: false
        },
        series: [
          {
            type: "",
            name: "Many Total Deaths",
            data: []
          }
        ]
      },
      lineChart: {
        chart: {
            type: 'spline'
        },
        title: {
          text: 'Top 10 countries w/ <b>many total cases</b>'
        },  
          plotOptions: {
                    spline: {
            marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
            }
        }
          },
           xAxis: {
            categories: [],
            title: {
              text: "Countries"
            }
          },
          yAxis: {
              title: {
                  text: 'Total'
              }
          },
          credits: {
            enabled: false
          },
          series: [{
              name: 'Many Total Cases',
              data: []
          }],
        }
    };
  },
  methods: {
    
    allData() {
      axios
        .get("https://corona.lmao.ninja/v2/all")
        .catch(err => console.log(err))
        .then(data => {
          this.message = data.data;
        });
    },
    ChartTotalDeathInEachCountry() {
      axios
        .get("https://corona.lmao.ninja/v2/countries?sort=deaths")
        .catch(err => console.log(err))
        .then(data => {
          var samp = data.data;
          var indexes = Object.keys(samp).map(i => i); //getonly index
          var table_data = {
            countries: [],
            deaths: []
          };

          for (var i = 0; i < 10; i++) {
            table_data.countries.push(samp[indexes[i]].country);
            table_data.deaths.push(samp[indexes[i]].deaths);
          }

          //this will set the data

          this.chartOptions.xAxis.categories = table_data.countries;
          this.chartOptions.series[0].data = table_data.deaths;
          
        });
    },
    ChartTotalCasesInEachCountry() {
      axios
        .get("https://corona.lmao.ninja/v2/countries?sort=cases")
        .catch(err => console.log(err))
        .then(data => {
          var samp = data.data;
          var indexes = Object.keys(samp).map(i => i); //getonly index
          var table_data = {
            countries: [],
            cases: []
          };

          for (var i = 0; i < 10; i++) {
            table_data.countries.push(samp[indexes[i]].country);
            table_data.cases.push(samp[indexes[i]].cases);
          }

          //this will set the data

          this.lineChart.xAxis.categories = table_data.countries;
         //console.log(table_data.countries[0]);
          this.lineChart.series[0].data = table_data.cases;
          
        });
    },
    LoadAllData(){
      axios
        .get("https://corona.lmao.ninja/v2/countries?sort=cases")
        .catch(err => console.log(err))
        .then(data => {
          for(var i=0; i<data.data.length; i++)  {
            this.data.rows.push(
              {country:'<img class="img-fluid float-left" style="width: 20%;height:150px;" src="' + data.data[i].countryInfo.flag + '" >&ensp;' + 
              data.data[i].country + '<br>&ensp;Total Cases: ' + this.formatPrice(data.data[i].cases) + 
              '<br>&ensp;Today Cases: ' + this.formatPrice(data.data[i].todayCases) +
              '<br>&ensp;Deaths: ' + this.formatPrice(data.data[i].deaths) +
              '<br>&ensp;Today Deaths: ' + this.formatPrice(data.data[i].todayDeaths) +
              '<br>&ensp;Recovered: ' + this.formatPrice(data.data[i].recovered) + 
              '<br>&ensp;Active: ' + this.formatPrice(data.data[i].active) +
              '<br>&ensp;Critical: ' + this.formatPrice(data.data[i].critical)
              }
              );
          }
          
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  mounted() {
    this.allData();
    this.ChartTotalDeathInEachCountry();
    this.ChartTotalCasesInEachCountry();
    this.LoadAllData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
