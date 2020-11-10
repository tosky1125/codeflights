import React, { useState } from 'react';
import './Main.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import * as travelActions from '../modules/travel';
import * as planCheck from '../modules/destinations';

function Main(props) {
  const [depDate, setDep] = useState(null);
  const [period, setPeriod] = useState(null);
  const { isLoad, history } = props;

  const handleKeyPressDep = (e) => {
    if (e.key === 'Enter') {
      setDep(e.target.value);
      e.target.value = null;
    }
  };
  const handleKeyPressPeriod = (e) => {
    if (e.key === 'Enter') {
      setPeriod(e.target.value);
    }
  };
  const searchDate = () => {
    const { destinationsCheck, start } = props;
    axios
      .post('https://codeflights.xyz/search/result', {
        departureDate: depDate,
        arrivalDate: period,
      })
      .then((res) => {
        destinationsCheck(res.data);
        localStorage.destinations = JSON.stringify(res.data);
      })
      .then(() => start());
  };

  return (
    <div className='Main'>
      <div className='search'>
        {depDate === null && (
          <div>
            <h1>며칠 후에 출발하실 건가요?</h1>
            <input
              type='number'
              pattern='[0-9]+'
              onKeyPress={handleKeyPressDep}
              className='dep'
              placeholder='숫자를 입력해주세요.'
            />
          </div>
        )}
        {period === null && depDate !== null && (
          <div>
            <h1>얼마동안 여행하실 건가요?</h1>
            <input
              className='period'
              type='number'
              onKeyPress={handleKeyPressPeriod}
              pattern='[0-9]+'
              placeholder='숫자를 입력해주세요.'
            />
          </div>
        )}
        {period !== null && depDate !== null && <CircularProgress />}
        {period !== null && depDate !== null && searchDate()}
        {isLoad && history.push('/search/result')}
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    departureDate: state.travel.departureDate,
    arrivalDate: state.travel.arrivalDate,
    isLoad: state.travel.isLoad,
    place: state.destinations.place,
  }),
  (dispatch) => ({
    start: () => dispatch(travelActions.whenIsDepDate()),
    destinationsCheck: (data) => dispatch(planCheck.destinationsCheck(data)),
  }),
)(Main);
