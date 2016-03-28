import React from 'react';
import Hello from '../components/Hello/Hello';


export default class Home extends React.Component {

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <section className="Content">
        <Hello />
      </section>
    );
  }
}
