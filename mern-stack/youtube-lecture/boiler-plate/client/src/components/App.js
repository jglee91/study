import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home';
import About from './about';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </Switch>
  );
}

export default App;
