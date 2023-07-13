/* eslint-disable */ 
<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-2 con">
        <div class="container p-3">
          <div class="details">
              <div class="small-box text-white" style="background-color:#ff5050;">
                <div class="inner">
                  <h6><b>Total Cases</b></h6>
                  <p>{{ totalCases }} </p>
                </div>
              </div>
              <div class="small-box text-white bg-success">
                <div class="inner">
                  <h6><b>Total Recovered</b></h6>
                  <p>{{ totalRecovered }} </p>
                </div>
              </div>
              <div class="small-box text-white bg-danger">
                <div class="inner">
                  <h6><b>Total Deaths</b></h6>
                  <p>{{ totalDeaths }} </p>
                </div>
              </div>

              <b-list-group>
                <p class="text-white"><b>Top 10 Countries w/ many cases</b></p>
                <b-list-group-item v-for="pbars in pbar" :key="pbars.id" class="d-flex justify-content-between align-items-center">
                  {{ pbars.country }}
                  <b-badge variant="danger" pill> {{ pbars.value}} </b-badge>
                </b-list-group-item>
              </b-list-group><br>
    
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-10">
        <div style="height: 100vh; width: 100%">
          <l-map
            style="height: 100%; width: 100%"
            :zoom="zoom"
            :maxZoom="maxZoom"
            :center="center"
            :minZoom="minZoom"
            :bounds="bounds"
            :max-bounds="maxBounds"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @update:bounds="boundsUpdated"
          >
            <l-tile-layer :url="url" :noWrap="noWrap" :attributionControl="attributionControl"></l-tile-layer>
            <l-marker
              v-for="circle in circles"
              :key="circle.id"
              :lat-lng="circle.center"
              :color="circle.color"
              :icon="icon"
            >
              <l-popup>
                <img :src="circle.flag" width="50" height="30" style="border:1px solid #cccccc">
                <b>{{ circle.country}}</b><br>
                <p>
                  <b>Cases:</b>{{ circle.cases}}<br>
                  <b>Recovered:</b>{{ circle.recovered}}<br>
                  <b>Deaths:</b>{{ circle.deaths}}<br>
                  <b>Active:</b>{{ circle.active}}
                </p>
              </l-popup>
            </l-marker>
          </l-map>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "admin-lte/dist/css/adminlte.css";
@import "//cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css";
.con{
 /*background-color: #AAD3DF; */
 background-color: #343a40;
 height: 100vh;
 overflow-y: scroll;
}
</style>
<script>
import { latLngBounds, latLng,L,icon,control } from "leaflet";
import axios from 'axios'

export default {
  title: 'COVID-19 Monitoring',
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [47.413220, -1.219482],
      maxZoom: 20,
      minZoom: 3,
      noWrap: true,
      maxBoundsViscosity: 1.0,
      bounds: null,
      maxBounds: latLngBounds([
        [-84.72233856539854, -180],
        [85.06500754829302, 180.17578125]
      ]),
      circles: [],
      totalCases: "",
      totalDeaths: "",
      totalRecovered: "",
      pbar: [],
      icon: icon({
        iconUrl: require('../assets/Coronavirus.png') ,
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      noWrap: true,
      attributionControl: false
    };
  },
  // computed: {
  //   dynamicSize () {
  //     return [this.iconSize, this.iconSize * 1.15];
  //   },
  //   dynamicAnchor () {
  //     return [this.iconSize / 2, this.iconSize * 1.15];
  //   }
  // },
  created() {
    this.getAllData();
    this.totalData();
    this.ChartTotalCasesInEachCountry();
  },
  methods: {
    randomValue() {
      this.value = Math.random() * this.max
    },
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },
    getAllData(){
      axios.get('https://disease.sh/v3/covid-19/countries').then((response) => {
        var number = 0;
        response.data.forEach(d => {
          this.circles.push({
            id: number += 1,
            center: [d.countryInfo.lat,d.countryInfo.long],
            color: 'red',
            country: d.country,
            flag: d.countryInfo.flag,
            cases: this.formatNumbers(d.cases),
            recovered: this.formatNumbers(d.recovered),
            deaths: this.formatNumbers(d.deaths),
            active: this.formatNumbers(d.active),
          })
        });
      }).catch((err) => {
        //console.log(err);
      })
    },
    formatNumbers(value) {
      let val = (value / 1).toFixed(0).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    totalData(){
      axios.get('https://disease.sh/v3/covid-19/all').then((response) => {
        this.totalCases = this.formatNumbers(response.data.cases)
        this.totalRecovered = this.formatNumbers(response.data.recovered)
        this.totalDeaths = this.formatNumbers(response.data.deaths)
      }).catch((err) => {
        //console.log(err);
      })
    },
    ChartTotalCasesInEachCountry() {
      axios
        .get("https://disease.sh/v3/covid-19/countries?sort=cases")
        .catch(err => console.log(err))
        .then(data => {
          var inc = 0;
          for (var i = 0; i < 10; i++) {
            this.pbar.push({
              id: inc +=1,
              value: this.formatNumbers(data.data[i].cases),
              country: data.data[i].country
            });
          }
        });
    },
  },

}
</script>
 