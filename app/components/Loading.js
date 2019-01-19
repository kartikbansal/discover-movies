<<<<<<< HEAD
import React from 'react'

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Loading'
    }
  }

  componentDidMount() {
    const stopper = 'Loading...';
    this.timerId = setInterval(() => {
      this.state.text === stopper
      ? this.setState(() => ({text: 'Loading'}))
      : this.setState((prev) => ({text: prev.text.concat('.')}));
    }, 250)
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render () {
    const { text } = this.state;
    return (
      <h1 className="load" style={{color: this.props.color}}>{text}</h1>
    )
  }
}

export default Loading;
=======
import React from 'react'

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Loading'
    }
  }

  componentDidMount() {
    const stopper = 'Loading...';
    this.timerId = setInterval(() => {
      this.state.text === stopper
      ? this.setState(() => ({text: 'Loading'}))
      : this.setState((prev) => ({text: prev.text.concat('.')}));
    }, 250)
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render () {
    const text = this.state.text;
    return (
      <h1 className="load" style={{color: this.props.color}}>{text}</h1>
    )
  }
}

export default Loading;
>>>>>>> 3d5d0e147fbb8acc7a57ffbb61fd4bba191c0512
