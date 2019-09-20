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



import React, { Component } from 'react'
import vis from 'vis/dist/vis.min'
import { GEOITEM, PHONEITEM, TIMELINEOPTIONS, TIMELINEGROUPS } from '../constants/config'
import '../../node_modules/vis/dist/vis.min.css'
import '../styles/timeLine.css'

let timeline = {}
let items = []
const renderGeoItems = (items) => {
  let data = []
  if (items.length > 0) {
    items.map((item) => (
      data.push({
        id: item._id,
        start: item.timestamp.replace(/T/g, ' ').replace(/Z/g, ''),
        group: 0,
        className: GEOITEM,
        latitude: item.latitude,
        longitude: item.longitude,
        title: '<div classNme="data-tooltip"><p>Position: (' + item.latitude + ', ' +
              item.longitude + ')</p><p>Timestamp: ' + item.timestamp.replace(/T|Z/g, ' ') + '</div>'
      })
    ))
  }
  return data
}
const renderPhoneItems = (items) => {
  let data = []
  if (items.length > 0) {
    items.map((item) => (
      data.push({
        id: item._id,
        start: item.timestamp.replace(/T/g, ' ').replace(/Z/g, ''),
        group: 1,
        className: PHONEITEM,
        latitude: item.latitude,
        longitude: item.longitude,
        title: '<div classNme="data-tooltip"><p>Numéro de contact: ' +
                item.partner + '</p><p>Type d\'appel: ' + item.type + '</p></div>'
      })
    ))
  }
  return data
}
const formatDate = (date) => {
  let year = date.getFullYear() + ''
  let month = (date.getMonth() + 1) + ''
  let day = date.getDate() + ''
  if (month.length === 1) { month = '0' + month }
  if (day.length === 1) { day = '0' + day }
  return year + '-' + month + '-' + day
}
const move = (percentage) => {
  var range = timeline.getWindow()
  var interval = range.end - range.start
  timeline.setWindow({
    start: range.start.valueOf() - interval * percentage,
    end: range.end.valueOf() - interval * percentage
  })
}
class TimeLine extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFirstFetch: true
    }
    this.onSelectDataByDate = this.onSelectDataByDate.bind(this)
    this.onSelectMarker = this.onSelectMarker.bind(this)
    this.initTimeline = this.initTimeline.bind(this)
  }
  componentDidMount () {
    this.initTimeline()
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps.date)
  //   console.log(isEqual(nextProps.date, this.props.date))
  //   if(isEqual(nextProps.date, this.props.date) && (!isEmpty(this.props.date))) {
  //     return false
  //   }
  //    return true
  // }
  componentWillUnmount () {
    timeline.off('rangechanged', this.onSelectDataByDate)
    timeline.off('click', this.onSelectMarker)
  }
  onSelectDataByDate (properties) {
    // if (properties.byUser) {
      this.setState({isFirstFetch: false})
      let start = formatDate(timeline.getWindow().start)
      let end = formatDate(timeline.getWindow().end)
      let geoIndexByDate = this.props.mango.geolocationsIndexByDate
      let phoneIndexByDate = this.props.mango.phonecallsIndexByDate
      this.props.selectDataByDate(start, end, geoIndexByDate, phoneIndexByDate)
    // }
  }
  onSelectMarker (properties) {
    let item_id = properties.items
    console.log(properties)
    for(let i in items) {
      if(items[i].id == item_id) {
        var title = items[i].title
        var latitude = Number(items[i].latitude)
        var longitude = Number(items[i].longitude)
        this.props.onChangeCenter(latitude, longitude)
      }
    }
  }
  initTimeline () {
    let container = document.getElementById('mytimeline')
    timeline = new vis.Timeline(container, items, TIMELINEGROUPS, TIMELINEOPTIONS)
    timeline.addEventListener('rangechanged', this.onSelectDataByDate)
    timeline.addEventListener('select', this.onSelectMarker)
  }

  render () {
    const { geolocations, phonecalls } = this.props
    let geoItems = renderGeoItems(geolocations)
    let phoneItems = renderPhoneItems(phonecalls)
    items = [...geoItems, ...phoneItems]
    if (geoItems.length > 0 || phoneItems.length > 0) {
      timeline.setItems(items)
      if (this.state.isFirstFetch) {
        let lastDay = new Date().toISOString()

        if (geoItems.length > 0 && phoneItems.length > 0) {
          lastDay = (geoItems[0].start > phoneItems[0].start) ? geoItems[0].start : phoneItems[0].start
        } else if (geoItems.length > 0) {
          lastDay = geoItems[0].start
        } else if (phoneItems.length > 0) {
          lastDay = phoneItems[0].start
        }
        let startDay = new Date(new Date(lastDay).getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
        timeline.setWindow(startDay, lastDay)

      }
    }
    return (
      <div>
        <div id='mytimeline' />
      </div>
    )
  }
}
export default TimeLine

export const zoomInTimeLine = () => {
  timeline.zoomIn(0.2)
}

export const zoomOutTimeLine = () => {
  timeline.zoomOut(0.2)
}

export const moveLeftTimeLine = () => {
  move(0.2)
}
export const moveRightTimeLine = () => {
  move(-0.2)
}
