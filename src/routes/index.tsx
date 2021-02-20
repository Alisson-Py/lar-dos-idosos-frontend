import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Details from '../pages/Details';

import Landing from '../pages/Landing';
import List from '../pages/List';
import Login from '../pages/Login';
import NewOldman from '../pages/NewOldman';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/login" exact component={Login} />
      <Route path="/list" exact component={List} />
      <Route path="/details/:id" exact component={Details} />
      <Route path="/create" component={NewOldman} />
    </BrowserRouter>
  ); 
}