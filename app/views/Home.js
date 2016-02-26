import React from "react";
import { Router, Route, browserHistory, Link } from 'react-router';

import Hello from '../components/Hello/Hello';


export default class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		return (
			<section className="Content">
			    <Hello/>
		  	</section>
		);
	}
}
