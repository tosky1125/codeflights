import React from 'react';
import './Editor.css';

const axios = require('axios');

class Posting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.postingArticle = this.postingArticle.bind(this);
  }

  handleChange = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  postingArticle() {
    const { title, content } = this.state;
    const { history } = this.props;
    return axios
      .post('https://codeflights.xyz/post/write', {
        title,
        content,
      })
      .then(() => {
        history.push('/');
      });
  }

  render() {
    return (
      <div className='editor'>
        <div className='article-container'>
          <form
            className='editorArticle'
            onSubmit={(e) => {
              e.preventDefault();
              this.postingArticle();
            }}
          >
            <input
              type='text'
              className='editorTitle'
              placeholder='어디를 추억하고 싶으신가요?'
              onChange={this.handleChange('title')}
            />
            <hr />
            <textarea
              className='editorContents'
              rows={15}
              placeholder='여행의 기억을 기록해주세요.'
              onChange={this.handleChange('content')}
            />
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Posting;
