import React, { Component } from 'react';

import MyComponent from './chapter03/MyComponent';
import EventPractice from './chapter04/EventPractice';
import ValidationSample from './chapter05/ValicationSample';
import ScrollBox from './chapter05/ScrollBox';

export default class App extends Component {
  render() {
    return (
        /* chapter 03 */
        // <MyComponent name={'커스텀 이름'} />
        /* 아래는 에러*/
        // <MyComponent name={3} />
        // <MyComponent name="React" age={4} />
        /* chapter 04 */
        // <EventPractice />
        // <ValidationSample />
        <>
          <ScrollBox ref={ref => this.scrollBox=ref} />
          <button onClick={() => this.scrollBox.scrollToBottom()}>맨 밑으로</button>
        </>
    );
  }
}

