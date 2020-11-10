import React from 'react';
import './Result.css';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import * as planCheck from '../modules/destinations';
import * as plan from '../modules/plan';
import * as travelActions from '../modules/travel';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inload: false };
  }

  componentDidMount() {
    const { start } = this.props;
    start();
  }

  planToGo = (city) => {
    const { getPlan, loaded } = this.props;
    this.setState({ inload: true });
    axios
      .post('https://codeflights.xyz/search/result/destination', { city })
      .then((res) => {
        getPlan(res.data);
        localStorage.plan = JSON.stringify(res.data);
        loaded(city);
      });
  };

  render() {
    const {
      place, load, city, history,
    } = this.props;
    const { inload } = this.state;

    let destination = place;
    if (destination.length === 0) {
      destination = JSON.parse(localStorage.destinations);
    }
    const travel = destination.map((ele) => (
      <div onClick={() => this.planToGo(ele.destinations)}>
        {load && city === ele.destinations ? (
          history.push(`/result/${city}`)
        ) : (
            <div className='where focus' style={{ backgroundImage: `url(${ele.img})` }}>
              <div className='titlelayer'><h2 className='cityname'>{ele.destinations}</h2>
                <div className='estTime'><h3>{ele.estTime}</h3></div>
              </div>
            </div>
          )}
      </div>
    ));

    return (
      <div className='result'>
        <div className='result-container'>
          {inload && (
            <div className='Circular'>
              <CircularProgress />
            </div>
          )}
          <p className='result-title'>
            {`방문 가능한 ${destination.length}개의 도시`}
          </p>
          <div className='cities'>{travel}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    place: state.destinations.place,
    flights: state.plan.flights,
    blogPostings: state.plan.blogPostings,
    userPostings: state.plan.userPostings,
    load: state.plan.load,
    city: state.plan.city,
    isLoad: state.travel.isLoad,
  }),
  (dispatch) => ({
    destinationsCheck: (data) => dispatch(planCheck.destinationsCheck(data)),
    getPlan: (data) => dispatch(plan.getPlan(data)),
    loaded: (data) => dispatch(plan.loaded(data)),
    start: () => dispatch(travelActions.whenIsDepDate()),
  }),
)(Result);
