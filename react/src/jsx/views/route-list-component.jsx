import React from 'react';
import statemachine from '../statemachine';
import moment from 'moment';


var RouteList = React.createClass({
  getInitialState: function(){
    return statemachine.getState();
  },
  render: function() {
    var routes = this.state.routes;
    if (routes) {
      return (
        <ul className="route-list">
          <li key="-1">
            <ul className="route">
              <li key={-1 + 'date'}>Date</li>
              <li key={-1 + 'type'}>Type</li>
              <li key={-1 + 'status'}>Status</li>
              <li key={-1 + 'link'}></li>
            </ul>
          </li>
          {routes.map(function(route, i){
            let date = formatDate(route.date);
            let type = determineRouteType(route.bars);
            let status = determineRouteStatus(route.bars);
            return (
              <li key={i}>
                <ul className="route">
                  <li key={i + 'date'} className="date">{date}</li>
                  <li key={i + 'type'} className="type">{type}</li>
                  <li key={i + 'status'} className="status">{status}</li>
                  <li key={i + 'link'}><a className="btn btn-primary route-view-button" href={'/#/routes/' + i}>View</a></li>
                </ul>
              </li>
            )
          })}
        </ul>
      );
    } else {
      return (
        <p>No Previous Bar Routes</p>
      );
    }
  }
});


function formatDate(isoDate){
  let formattedDate = moment(isoDate).format('ddd M/D/YY');
  return formattedDate;
};

function determineRouteStatus(barArray){
  let statuses = [], result = null;
  for(var i = 0; i < barArray.length; i += 1){
    if(barArray[i].checked_in){
      continue;
    }else if (barArray[i].skipped){
      result = <i className="fa fa-frown-o"></i>;
      break;
    }else if (!barArray[i].skipped && !barArray[i].checked_in){
      result = <i className="fa fa-ellipsis-h"></i>;
      break;
    }
  }
  return result || <i className="fa fa-smile-o"></i>;
};

function determineRouteType(barArray){
  let barCount = barArray.length;
  switch (barCount) {
    case 3:
      return 'Fun Run';
      break;
    case 5:
      return '5k';
      break;
    case 8:
      return 'Marathon';
      break;
    default:
      return 'Custom Tour';
      break;
  }
};

module.exports = {
  RouteList: RouteList
}
