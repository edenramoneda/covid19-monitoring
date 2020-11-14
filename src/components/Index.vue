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
    <l-circle
      v-for="circle in circles"
      :key="circle.id"
      :lat-lng="circle.center"
      :radius="circle.radius"
      :color="circle.color"
    />
    </l-map>
  </div>
</template>

<script>
import { latLngBounds, latLng } from "leaflet";
import axios from 'axios'
export default {
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
      circles: 
        [
          // {
          //   id: 0,
          //   center: [32.53952745, -86.64408227],
          //   radius: 404713,
          //   color: 'red'
          // }
        ]
      
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
      axios.get('https://disease.sh/v3/covid-19/jhucsse').then((response) => {
        var number = 0;
        response.data.forEach(d => {
          this.circles.push({
            id: number += 1,
            center: [d.coordinates.latitude,d.coordinates.longitude],
            radius: d.stats.confirmed,
            color: 'red'
          })
        });
      }).catch((err) => {
        console.log(err);
      })
    }
  },

}
</script>
 