import React from 'react';
export default class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      timerTime: 0
    }
  }

  handleStartTime = () => {
    (this.timer = setInterval(() => {
      this.setState({
        timerOn: true,
        timerTime: this.state.timerTime + 10 
      });
    }, 10))
  };

  handleStopTime = () => {
    this.setState({
      timerOn: false,
    });
    clearInterval(this.timer)
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleResetTime = () => {
    clearInterval(this.timer);
    this.setState({
      timerOn: false,
      timerTime: 0
    })
  }


  render() {
    let { timerTime } = this.state;

    let miliseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ('0' + (Math.floor(timerTime / 3600000) % 60)).slice(-2);


    return (
      <>
        <div className="container">
          <div>
            <div className=" stopwatch content-container">
              <button onClick={() => this.props.close("stopwatch")} className=" hide hide-btn"> X </button>
              <div>
                <h2>  Stopwatch </h2>
                <div>
                  <span className="timer-font">{hours}</span>
                  <span className="timer-font"> : </span>
                  <span className="timer-font">{minutes}</span>
                  <span className="timer-font"> : </span>
                  <span className="timer-font">{seconds}</span>
                  <span className="timer-font"> : </span>
                  <span className="timer-font">{miliseconds}</span>
                </div>
                <div>
                  {
                    this.state.timerOn === false && this.state.timerTime === 0 &&
                    (
                      <div className="start-btn">
                        <button onClick={this.handleStartTime} className="btn-start">
                          Start
                        </button>
                      </div>
                    )
                  }
                  {
                    this.state.timerOn === true &&
                    (
                      <div className="start-btn">
                        <button onClick={this.handleStopTime} className="btn-start">
                          Stop
                        </button>
                      </div>
                    )
                  }
                  <div className="reset-btn">
                    {
                      this.state.timerOn === false && this.state.timerTime > 0 &&
                      (
                        <div>
                          <button onClick={this.handleStartTime} className="btn-start">
                            Resume
                          </button>
                        </div>
                      )
                    }
                    {
                      this.state.timerOn === false &&
                      (
                        <div>
                          <button onClick={this.handleResetTime} className="btn-start">
                            Reset
                          </button>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

    )
  }
}





