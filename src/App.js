import React, { Component } from 'react';
import { connect } from 'react-redux';


import getJSONData from './getJSONData';

class App extends Component {

	constructor(props) {
		super(props);
	}


	componentDidMount() {

      //from `mapDispatchToProps()`
      this.props.handleGetDataFr();   
	}


	render() {

		//from `mapStateToProps()`
		const preloadedState_httpData = this.props.httpData;
    const preloadedState_count = this.props.count;


    function renderList() {
      if ( preloadedState_httpData !== null ) {
        const list = preloadedState_httpData.map((item, index) => {
          return <li key={index}>{item.name}</li>;
        });
      
        return <ul>{list}</ul>;
      } else {
        return '';
      }

    }

    function renderCounter() {
      
      return preloadedState_count !== null ? preloadedState_count : '';
    }


		return (
      <React.Fragment>
        <a href='#' onClick={() => { this.props.handleGetDataFr(); }}>Asynchronous Fetch Data(fr)</a><br />
        <a href='#' onClick={() => { this.props.handleGetDataUs(); }}> Asynchronous Fetch Data(us)</a><br />
        <a href='#' onClick={() => { this.props.handleIncrement();}}>Counter ({renderCounter()})</a>

        {renderList()}
      </React.Fragment>
		);
	}

}

const mapStateToProps = (state) => {
	const { reNameDefaultReducer, countReducer } = state; //Receive redux

	return {
		httpData: reNameDefaultReducer,
    count: countReducer.count
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleGetDataFr: async () => dispatch({ type: 'RECEIVE_DEMO_LIST', payload: await getJSONData('fr') }),
    handleGetDataUs: async () => dispatch({ type: 'RECEIVE_DEMO_LIST', payload: await getJSONData('us') }),
    handleIncrement: () => dispatch({ type: 'INCREMENT'})
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);