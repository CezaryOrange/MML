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
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import TimeLine, { zoomInTimeLine, zoomOutTimeLine, moveLeftTimeLine, moveRightTimeLine } from '../components/TimeLine'

class TimeLineView extends Component {
  render () {
    const { date, selectDataByDate, geolocations, mango, phonecalls } = this.props
    return (
      <div>
        {/* <div>
          <h5>Date de début: <span>{date.start}</span> Date de fin: <span>{date.end}</span></h5>

        </div> */}
        <Row>
          <Col sm={6}>
          <h5>Date de début: <span>{date.start}</span> Date de fin: <span>{date.end}</span></h5>
          </Col>
          <Col sm={6}>
            <ButtonGroup bsSize='small' className='pull-right'>
              <Button bsStyle='success' onClick={zoomInTimeLine}><i className='fa fa-plus' /></Button>
              <Button bsStyle='success' onClick={zoomOutTimeLine}><i className='fa fa-minus' /></Button>
              <Button bsStyle='success' onClick={moveLeftTimeLine}><i className='fa fa-chevron-left' /></Button>
              <Button bsStyle='success' onClick={moveRightTimeLine}><i className='fa fa-chevron-right' /></Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <TimeLine geolocations={geolocations} phonecalls={phonecalls}
            date={date} selectDataByDate={selectDataByDate}
            mango={mango} onChangeCenter={this.props.onChangeCenter}/>
          </Col>
        </Row>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     geolocations: state.geolocations.geolocations,
//     phonecalls: state.phonecalls.phonecalls,
//     date: state.date,
//     mango: state.mango
//   }
// }
// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(ActionCreators, dispatch)
// })
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(TimeLineView)
export default TimeLineView
