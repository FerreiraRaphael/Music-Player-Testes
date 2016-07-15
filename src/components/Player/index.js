// Import React
import React from 'react';
import classes from './Player.scss'
// Import ClassNames
// import ClassNames from 'classnames';

// Player component class
class Player extends React.Component {
  
  render(){
    // Dynamic class names with ClassNames
    const playPauseClass =  this.props.playStatus ? 'fa fa-play' : 'fa fa-pause'
    const { player, player__backward, player__forward, player__main, playerContainer,
            progress, progress__bar } = classes
    // const playPauseClass = ClassNames({
    //   'fa fa-play': this.props.playStatus == 'PLAYING' ? false : true,
    //   'fa fa-pause': this.props.playStatus == 'PLAYING' ? true : false
    // });

    // Return JSX
    return (
      <div className={playerContainer}>
        <ul className={player}>
          {/*Rewind Button*/}
          <li className={player__backward}>
            <div onClick={this.props.backward}><i className="fa fa-backward"></i></div>
            {/*Play/Pause div*/}
            <div onClick={this.props.togglePlay}><i className={playPauseClass}></i></div>
            <div onClick={this.props.forward}><i className="fa fa-forward"></i></div>
          </li>
          <li className={player__main}>
            {/*Random Track div*/}
            <span>0:00</span>
            <div className={progress__bar}>
              <div className={progress}></div>
            </div>
            <span>5:00</span>
          </li>
          {/*Forward Button*/}
          <li className={player__forward}>
              <div onClick={this.props.random}><i className="fa fa-random"></i></div>
          </li>
        </ul>
      </div>
    )
  }

}

// Export Player
export default Player