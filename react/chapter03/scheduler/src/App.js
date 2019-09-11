import React from 'react';
import MyComponent from './MyComponent';

export default function App() {
  return (
    // <MyComponent name={'커스텀 이름'} />
    /* 아래는 에러*/
    // <MyComponent name={3} />
    <MyComponent name="React" age={4} />
  );
}