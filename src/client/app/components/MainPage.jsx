import React from 'react';
import Header from './Header.jsx';
import Lookup from './Lookup.jsx';
import Results from './Results.jsx';
import { connect } from 'react-redux';
import store from './../store/store.js';
import { Link } from 'react-router-dom';
import request from './../lib/apiCalls.js';

class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(input) {

  
    request.getUserId(input)
      .then((result)=> {
        request.getChampionInfo(result.data.id)
          .then((result) =>{
            let ids = [];
            for (let i=0; i<result.data.length; i++) {
              ids.push(result.data[i].championId);
            }
            request.getChampionNames(ids)
            .then((result) => {
              store.dispatch({type: "CHAMPION_DETAILS", payload: result.data})
            })
          });
      });

  }

  render() {
    let lineItems = [];
      for (let i=0; i<this.props.data.length; i++) {
        lineItems.push(<Results key={'key'+i} info={this.props.data[i]} />)
      }
    let test = store.getState().championDetails;
    return (
      <div>
        <Lookup handleSubmit={this.handleSubmit} />
         {lineItems} 
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {data: state.champions.champions};
}

function mapDispatchToProps(dispatch) {
  return dispatch;
}

export default connect(mapStateToProps)(MainPage);