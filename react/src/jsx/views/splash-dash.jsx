import React from 'react';
import statemachine from '../statemachine';
import { RouteForm } from './newroute';

var Login = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  render: function(){
    return (
      <main>
        <div className="splash">
          <img className="splash-map" src="images/map.jpg" />
          <a href="/auth/twitter"><button className="btn btn-primary" className="btn btn-primary">Login with Twitter</button></a>
        </div>
      </main>

    );
  }
});

var Dashboard = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  render: function(){
    return (
      <div className="dash">
        <img className="profile-image" src={this.state.user.twitter_image} />
        <p>{this.state.user.twitter_name}</p>
        <RouteForm />
      </div>
    );
  }
});

var SplashDash = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  render: function() {
    if (this.state.user) {
      return <Dashboard />
    } else {
      return <Login />
    }
  }
});

module.exports = {
  SplashDash: SplashDash
};
