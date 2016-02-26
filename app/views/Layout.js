import React from "react";
import { Router, Route, browserHistory, Link } from 'react-router';

export default class Layout extends React.Component {
	constructor(props) {
	    super(props);
	}

	componentDidMount(){}

	render() {
		return (
			<div id="layout">
				{ this.props.children }
		  </div>
		);
	}
}
