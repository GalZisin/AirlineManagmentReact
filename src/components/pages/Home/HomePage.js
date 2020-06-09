import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import Carousel from '../../MyCarousel';
import Search from "../../Search.js";
import '../../SearchFlightsBox.css'
import { history } from '../../../history';
// import { connect } from 'react-redux';

// let hFlightId = '';
class HomePage extends Component {
  state = {
    isOpen: false
  }
  componentDidMount() {

    let params = queryString.parse(this.props.location.search)
    console.log("params: " + JSON.stringify(params))
    if(params !== null && params.flightId !== undefined){
       history.push(`/SelectDates/${params.flightId}`);
    }
    // let flightId = localStorage.getItem('flightId');
    // console.log("hFlightId: " + hFlightId)
    // if(hFlightId !== null && hFlightId !== ''){
    //   // alert("before push:"+ flightId)
   
    //   // history.push(`/SelectDates/${hFlightId}`);
    // }
  }

  render() {
    console.log(this.props)

    return (
      <div>
        <div className="homeSearch">
          <Search />
        </div>
        <div style={{ marginTop: 300 }}>
          <Carousel />
        </div>
      </div>
    );
  }
}
export default withRouter(HomePage);
// const mapStateToProps = (state, ownProps) => {
//   hFlightId = ownProps.match.params.flight_id
//   console.log("flight_id: " + hFlightId);
//   return state;
// }
// export default connect(mapStateToProps, null)(HomePage);
