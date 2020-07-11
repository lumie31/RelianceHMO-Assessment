import React from 'react';
import './App.scss';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import ExplorePage from './layouts/ExplorePage';
import PageNotFound from './layouts/PageNotFound';
import ViewProvider from './layouts/ViewProvider';

function App() {
  return (
    <BrowserRouter history="">
      <Switch>
        <Route path="/" exact component={ExplorePage} />
        <Route path="/view-provider" exact component={ViewProvider} />
        {/* TODO (6a): Add New Route for Viewing a single Provider */}
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
