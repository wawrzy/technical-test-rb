import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { SAppBar } from 'Components/structural';
import Workers from 'Scopes/Workers/Workers';
import Shifts from 'Scopes/Shifts/Shifts';
import NotFound from 'Scopes/Errors/404/404';

const App = () => (
  <Router>
    <div>
      <Route path="/" component={SAppBar} />
      <Switch>
        <Route exact path="/" component={Workers} />
        <Route exact path="/workers" component={Workers} />
        <Route exact path="/shifts" component={Shifts} />
        <Route exact path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
