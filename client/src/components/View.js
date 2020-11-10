import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './View.css';
import * as view from '../modules/view';
import * as likes from '../modules/likes';

function View(props) {
  const { match, numOfLikes, likes } = props;
  const { city } = match.params;
  const { title, contents, id } = JSON.parse(localStorage.article);
  const totalLikes = numOfLikes;

  const [isClick, setClick] = useState(false);

  const handleClickLikes = () => {
    axios.post(`https://codeflights.xyz/post/likes/${id}`).then((data) => {
      setClick(data.data.like);
      likes(data.data.likes);
    });
  };

  return (
    <>
      <div className='view'>
        <div className='viewTitle'>{title}</div>
        <span
          className={isClick ? 'noHeart' : 'heart'}
          onClick={handleClickLikes}
        />
        <h2 className='numb'>{totalLikes}</h2>
        <hr />
        <div className='viewContents'>{contents}</div>
        <hr />
        <div className='viewFooter'>
          <Link to={`/result/${city}`}>
            <button className='gobacklist'>목록으로 돌아가기</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default connect(
  (state) => ({
    articleContent: state.view.article,
    numOfLikes: state.likes.likes,
  }),
  (dispatch) => ({
    article: (data) => dispatch(view.view(data)),
    likes: (data) => dispatch(likes.likes(data)),
  }),
)(View);
