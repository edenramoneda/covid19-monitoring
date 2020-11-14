/* eslint-disable */ 
<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-2">
        <div class="container p-3">
          <div class="details">
              <div class="small-box text-white" style="background-color:#ff5050;">
                <div class="inner">
                  <h4><b>Total Cases</b></h4>
                  <h5>{{ totalCases }} </h5>
                </div>
              </div>
              <div class="small-box text-white bg-success">
                <div class="inner">
                  <h4><b>Total Recovered</b></h4>
                  <h5>{{ totalRecovered }} </h5>
                </div>
              </div>
              <div class="small-box text-white bg-danger">
                <div class="inner">
                  <h4><b>Total Deaths</b></h4>
                  <h5>{{ totalDeaths }} </h5>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-10">
        <div style="height: 100vh; width: 100%" class="con">
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
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker
              v-for="circle in circles"
              :key="circle.id"
              :lat-lng="circle.center"
              :color="circle.color"
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
.con{
 /*background-color: #AAD3DF; */
 background-color: #fff;
}
</style>
<script>
import { latLngBounds, latLng } from "leaflet";
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
      totalRecovered: ""
    };
  },
  created() {
    this.getAllData();
    this.totalData();
  },
  methods: {
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
            deaths: this.formatNumbers(d.cases),
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
    }
  },

}
</script>
 