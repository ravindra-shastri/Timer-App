import React from 'react';
export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      timerStart: 0,
      timerTime: 0
    }
  }

  handleStartTime = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        alert("Countdown ended");
      }
    }, 10)
  };

  handleStopTime = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };

  handleResetTime = () => {
    clearInterval(this.timer);
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: 0
      });
    }
  };

  adjustTime = ({ type = 'hours', adjust = -1 }) => {
    const { timerTime } = this.state;
    const values = { hours: 3600000, minutes: 60000, seconds: 1000 };
    if (timerTime - values[type] < 0 && adjust === -1) return;
    if (adjust === -1) {
      this.setState({ timerTime: timerTime - values[type] });
    } else if (adjust === 1) {
      this.setState({ timerTime: timerTime + values[type] });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {

    const { timerTime, timerStart, timerOn } = this.state;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ('0' + (Math.floor(timerTime / 3600000) % 60)).slice(-2);

    return (
      <>
        <div>
          <div className="content-container">
            <button onClick={() => this.props.close("countdown")} className="hide-btn"> X </button>
            <h2>  Countdown </h2>
            <div className="timer-containe">
              <div className="count-name">
                <span>Hours</span>
                <span> : </span>
                <span>Minutes</span>
                <span> : </span>
                <span>Second</span>
              </div>
              <div className="up-arrow">
                <button className="arrow" disabled={timerOn} onClick={() => this.adjustTime({ type: 'hours', adjust: 1 })}> <i className="fa-solid fa-arrow-up"></i> </button>
                <button className="arrow" disabled={timerOn} onClick={() => this.adjustTime({ type: 'minutes', adjust: 1 })}> <i className="fa-solid fa-arrow-up"></i> </button>
                <button className="arrow" disabled={timerOn} onClick={() => this.adjustTime({ type: 'seconds', adjust: 1 })}> <i className="fa-solid fa-arrow-up"></i> </button>
              </div>

              <div className="count-font">
                <span>{hours}</span>
                <span> : </span>
                <span>{minutes}</span>
                <span> : </span>
                <span>{seconds}</span>
              </div>
              <div className="down-arrow">
                <button className="arrow" disabled={timerOn} onClick={() => this.adjustTime({ type: 'hours', adjust: -1 })}> <i className="fa-solid fa-arrow-down"></i> </button>
                <button className="arrow" disabled={timerOn} onClick={() => this.adjustTime({ type: 'minutes', adjust: -1 })}> <i className="fa-solid fa-arrow-down"></i> </button>
                <button className="arrow" disabled={timerOn} onClick={() => this.adjustTime({ type: 'seconds', adjust: -1 })}> <i className="fa-solid fa-arrow-down"></i> </button>
              </div>

            </div>
            <div>
              {timerOn === false &&
                (
                  <div className="start-btn">
                    <button onClick={this.handleStartTime} className="btn-start"> Start </button>
                  </div>
                )
              }
              {timerOn === true && timerTime >= 1000 &&
                (
                  <div className="start-btn">
                    <button onClick={this.handleStopTime} className="btn-start"> Stop </button>
                  </div>
                )
              }
              <div className="reset-btn">
                {timerOn === false && timerStart !== 0 && timerStart !== timerTime && timerTime !== 0 &&
                  (
                    <div className="start-btn">
                      <button onClick={this.handleStartTime} className="btn-start"> Resume </button>
                    </div>
                  )
                }
                {(timerOn === false || timerTime < 1000) &&
                  timerStart !== timerTime &&
                  timerStart > 0 &&
                  (
                    <div className="start-btn">
                      <button onClick={this.handleResetTime} className="btn-start"> Reset </button>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

// (timerTime === 0 || timerTime === timerStart) &&