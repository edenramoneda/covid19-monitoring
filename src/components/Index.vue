/* eslint-disable */ 
<template>

  <div style="height: 100vh; width: 100%">
    <div class="info">
      <span>Center: {{ center }}</span>
      <span>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div>
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
</template>
<style scoped>
.leaflet-popup-content{
  width:15rem!important;
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
      circles: []
    };
  },
  created() {
    this.getAllData();
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
    }
  },

}
</script>
 