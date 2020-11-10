import React from 'react';
import './Schedule.css';
import { connect } from 'react-redux';
import axios from 'axios';
import * as planCheck from '../modules/destinations';
import * as plan from '../modules/plan';
import * as view from '../modules/view';
import * as likes from '../modules/likes';

function Schedule(props) {
  const { match } = props;
  const { city } = match.params;
  const {
    flights, userPostings, blogPostings, estPrice,
  } = JSON.parse(
    localStorage.plan,
  );
  const {
    article, history, isLogin, likes, changeLoad,
  } = props;
  const getLikes = (id) => {
    axios.get(`https://codeflights.xyz/post/likes/${id}`).then((data) => {
      const like = data.data.likes;
      likes(like);
      localStorage.likes = JSON.stringify(like);
      isLogin
        ? history.push(`/result/${city}/${id}`)
        : alert('로그인하시면 보실 수 있어요');
    });
  };

  const getArticle = (id) => {
    axios
      .get(`https://codeflights.xyz/post/article/${id}`)
      .then((res) => {
        article(res.data);
        localStorage.article = JSON.stringify(res.data);
      })
      .then(() => getLikes(id));
  };

  let counter = 10;
  if (userPostings) counter -= userPostings.length;
  const tickets = flights.map((ele, index) => (
    <ul key={index}>
      <li key={index + 1} className='ticket focus'>
        <img
          key={index + 2}
          className='airlineLogo'
          src={ele.carrierLogo}
          alt='ci'
        />
        <div key={index + 3}>{ele.carrierNo}</div>
        <div key={index + 4}>{ele.departure}</div>
      </li>
    </ul>
  ));
  let userPost;
  if (userPostings) {
    userPost = userPostings.map((ele, index) => (
      <ul key={index}>
        <li
          key={index + 1}
          className='article'
          onClick={() => getArticle(ele.id)}
        >
          <p key={index + 2} className='articleTitle'>
            {ele.title}
          </p>
          <p key={index + 3} className='articleContents'>
            {ele.contents}
          </p>
        </li>
      </ul>
    ));
  }
  let blog = [];
  for (let i = 0; i < counter; i += 1) {
    blog.push(
      <li key={i} className='article'>
        <a key={i + 1} className='articleLink' href={blogPostings[i].link}>
          <div key={i + 2} className='naver-articleTitle'>
            {blogPostings[i].title}
          </div>
          <div key={i + 3} className='articleContents'>
            {blogPostings[i].contents}
          </div>
        </a>
      </li>
    );
  }
  changeLoad();
  return (
    <div className='schedule'>
      <div className='focus blink price'>
        <h1>{`${city} 행 항공편 `}</h1>
        <h1>
          {`평균 ${estPrice}`}
        </h1>
      </div>
      <div className='schedule-containaer'>
        <div className='info'>
          {city}
          에 가는 항공편
        </div>
        <ul className='ticket-container'>{tickets}</ul>
        <div className='tip'>
          {city}
          여행 후기
        </div>
        <ul className='article-list'>
          {userPost && userPost}
          {blog}
        </ul>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    place: state.destinations.place,
    flights: state.plan.flights,
    blogPostings: state.plan.blogPostings,
    userPostings: state.plan.userPostings,
    articleLoaded: state.view.articleLoaded,
    isLogin: state.isLogin.login,
  }),
  (dispatch) => ({
    destinationsCheck: (data) => dispatch(planCheck.destinationsCheck(data)),
    getPlan: (data) => dispatch(plan.getPlan(data)),
    changeLoad: (data) => dispatch(plan.changeLoad(data)),
    article: (data) => dispatch(view.view(data)),
    likes: (data) => dispatch(likes.likes(data)),
  }),
)(Schedule);
