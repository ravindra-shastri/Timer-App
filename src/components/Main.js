import React from 'react';
import Stopwatch from './Stopwatch';
import Countdown from './Countdown';
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatch: false,
      countdown: false
    }
    // this.handleClose = this.handleClose.bind(this);
  }

  handleClose = (key) => {
    this.setState({ [key]: false })
  }

  render() {
    return (
      <>
        <div>
          <h1>
            Timers
          </h1>
          <div className="main-btn">
            {this.state.stopwatch ? (
              <Stopwatch  close={this.handleClose} />
            ) : (
              <button className="btn-main" onClick={() => this.setState({ stopwatch: true })}>
                Show Stopwatch
              </button>
            )}
            {this.state.countdown ? (
              <Countdown  close={this.handleClose} />
            ) : (
              <button className="btn-main" onClick={() => this.setState({ countdown: true })}>
                Show Countdown
              </button>
            )
            }
          </div>
        </div>
      </>
    )
  }
}

