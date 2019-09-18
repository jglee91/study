import React from 'react';

// chapter 03
import MyComponent from './chapter03/MyComponent';
// chapter 04
import EventPractice from './chapter04/EventPractice';

export default function App() {
  return (
      /* chapter 03 */
      // <MyComponent name={'커스텀 이름'} />
      /* 아래는 에러*/
      // <MyComponent name={3} />
      // <MyComponent name="React" age={4} />
      /* chapter 04 */
      <EventPractice />
  );
}

