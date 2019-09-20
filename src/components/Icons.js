/*
 * Copyright (C) 2018 - 2019 Orange
 * 
 * This software is distributed under the terms and conditions of the 'MIT'
 * license which can be found in the file 'LICENSE.txt' in this package distribution 
 * or at https://spdx.org/licenses/MIT
 *
 */

 /* Orange contributed module for use on CozyCloud platform
 * 
 * Module name: MML - Mapping My Life
 * Version:     1.0.5
 * Created:     2018 by Orange
 */


import L from 'leaflet'
import '../../node_modules/drmonty-leaflet-awesome-markers/css/leaflet.awesome-markers.css'
import '../../node_modules/drmonty-leaflet-awesome-markers/js/leaflet.awesome-markers.min.js'

export const geoIcon = L.AwesomeMarkers.icon({
  icon: 'street-view',
  markerColor: 'blue',
  prefix: 'fa'
})
export const phoneIcon = L.AwesomeMarkers.icon({
  icon: 'phone',
  markerColor: 'orange',
  prefix: 'fa'
})
export const homeIcon = L.AwesomeMarkers.icon({
  icon: 'home',
  markerColor: 'purple',
  prefix: 'fa'
})
export const workIcon = L.AwesomeMarkers.icon({
  icon: 'briefcase',
  markerColor: 'darktred',
  prefix: 'fa'
})
export const shopIcon = L.AwesomeMarkers.icon({
  icon: 'shopping-cart',
  markerColor: 'darkblue',
  prefix: 'fa'
})
export const sportIcon = L.AwesomeMarkers.icon({
  icon: 'futbol-o',
  markerColor: 'green',
  prefix: 'fa'
})
export const otherIcon = L.AwesomeMarkers.icon({
  icon: 'star',
  markerColor: 'darkpurple',
  prefix: 'fa'
})
export const startIcon = L.AwesomeMarkers.icon({
  icon: 'fa-sun-o',
  markerColor: 'black',
  prefix: 'fa'
})
export const endIcon = L.AwesomeMarkers.icon({
  icon: 'fa-moon-o',
  markerColor: 'black',
  prefix: 'fa'
})
