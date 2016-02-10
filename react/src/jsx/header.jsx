import React from 'react';
import statemachine from './statemachine';

var Header = React.createClass({
  getInitialState: function() {
    return statemachine.reducer({ user: this.props.user }, {});
  },
  render: function() {
    if (this.state.user) {
      return (
        <header id="header" className="top-bar-left" data-responsive-toggle data-hide-for="medium">
          <div className="title-bar-title">Stumblr</div>
          <button className="menu-icon" type="button" data-toggle>
            <Menu user={this.props.user} />
          </button>
        </header>
      );
    } else {
      return (
        <header id="header" className="top-bar-left" data-responsive-toggle data-hide-for="medium">
          <div className="title-bar-title">Stumblr</div>
        </header>
      );
    }
  }
});

var Menu = React.createClass({
  getInitialState: function(){
    return statemachine.reducer({
      user: this.props.user,
    },
    {
      type: 'SET_MENU_ITEMS',
      menu: [
        {
          link: '#/something',
          text: 'Go To This Thing'
        },
        {
          link: '#/something-else',
          text: 'Go To That Thing'
        }
      ]
  });
  },
  render: function(){
    var lis = this.state.menu.map(function(item, i){
      return (
        <li key={i}>
          <a href={item.link}>
            {item.text}
          </a>
        </li>
      );
    });
    return (
      <ul class="menu" data-responsive-menu="drilldown medium-dropdown">
        {lis}
      </ul>
    );
  }
})

module.exports = {
  Header: Header,
  Menu: Menu
};
