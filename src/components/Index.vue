/* eslint-disable */ 
<template>
    <div class="hold-transition layout-top-nav">
      <div class="wrapper">
          <div class="content-wrapper custom-container">
            <div class="content">
              <div class="container custom-container-2">
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
  background: #1a2980; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #26d0ce,
    #1a2980
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #26d0ce,
    #1a2980
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.custom-container-2 {
  background: #1a2980; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #26d0ce,
    #1a2980
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #26d0ce,
    #1a2980
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  -webkit-box-shadow: 0px -1px 11px 5px rgba(0, 0, 0, 0.73);
  -moz-box-shadow: 0px -1px 11px 5px rgba(0, 0, 0, 0.73);
  box-shadow: 0px -1px 11px 5px rgba(0, 0, 0, 0.73);
}
</style>

<script>
import axios from "axios";
import VueAxios from "vue-axios";
import MoneyFormat from "vue-money-format";
export default {
  data() {
    return {
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
          text: "Top 10 countries w/ many total deaths"
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
            text: 'Top 10 countries w/ many total cases'
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
            categories: []
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
        .get("https://corona.lmao.ninja/all")
        .catch(err => console.log(err))
        .then(data => {
          this.message = data.data;
        });
    },
    ChartTotalDeathInEachCountry() {
      axios
        .get("https://corona.lmao.ninja/countries?sort=deaths")
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
        .get("https://corona.lmao.ninja/countries?sort=cases")
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
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  mounted() {
    this.allData();
    this.ChartTotalDeathInEachCountry();
     this.ChartTotalCasesInEachCountry();
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
