import React from "react";
import News from './components/News/News'
import Category from './components/Category/Category'
import Users from './components/User/Users';
import Login from './components/Login/Login';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import GuardedRoute from './utils/guardedRoute';
import { initAuth } from "./components/store/actions";
import { useSelector, useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  dispatch(initAuth());

  const loggedIn = useSelector((state) => state.loggedIn);

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <GuardedRoute path="/home" exact auth={loggedIn} component={News} />
          <GuardedRoute
            path="/news"
            exact
            auth={loggedIn}
            component={News}
          />
          <GuardedRoute path="/category" exact auth={loggedIn} component={Category} />
          <GuardedRoute
            path="/users"
            exact
            auth={loggedIn}
            component={Users}
          />
          <Route path="/login" exact component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
