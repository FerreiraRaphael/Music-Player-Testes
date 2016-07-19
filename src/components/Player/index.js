// Import React
import React from 'react';
import classes from './Player.scss'
// Import ClassNames
// import ClassNames from 'classnames';

// Player component class
class Player extends React.Component {
<<<<<<< HEAD

  render(){
    // Dynamic class names with ClassNames
    const playPauseClass =  this.props.playStatus ? 'fa fa-play' : 'fa fa-pause'
    const { player, player__backward, player__forward, player__main, player__container,
            player__info, player__cover, player__details ,progress, progress__bar } = classes
=======
  
  constructor(props) {
    super(props)
    
  }
  componentDidMount(){
    let selector = `.${classes.progress__container}`
    let progress__container = document.querySelector(`.${classes.progress__container}`)
    progress__container.onmousedown = e => {
      let progress__bar = document.querySelector(`.${classes.progress__bar}`)
      progress__bar.onmousemove = (e) => {
        let me = document.querySelector(`.${classes.progress__bar}`),
            percent = e.offsetX / me.clientWidth,
            progress = me.querySelector(`.${classes.progress}`)
        percent = ((percent.toString().slice(0, 4) * 100) >= 99 ? 100 : percent.toString().slice(0, 4) * 100) + '%'
        progress.style.width = percent
      }
    }
    progress__container.onmouseup = e => {
      let progress__bar = document.querySelector(`.${classes.progress__bar}`)
      progress__bar.onmousemove = e => {}
    }
  }
  render(){
    // Dynamic class names with ClassNames
    const playPauseClass =  this.props.playStatus ? 'fa fa-play' : 'fa fa-pause'
    const { player, player__backward, player__forward, player__main, playerContainer,
            progress, progress__bar, progress__container } = classes  
>>>>>>> master
    // const playPauseClass = ClassNames({
    //   'fa fa-play': this.props.playStatus == 'PLAYING' ? false : true,
    //   'fa fa-pause': this.props.playStatus == 'PLAYING' ? true : false
    // });
    
    // Return JSX
    return (
      <div className={player__container}>
        <ul className={player}>
          <li className={player__backward}>
            <div onClick={this.props.backward}><i className="fa fa-backward"></i></div>
            <div onClick={this.props.togglePlay}><i className={playPauseClass}></i></div>
            <div onClick={this.props.forward}><i className="fa fa-forward"></i></div>
          </li>
          <li className={player__main}>
            <span>0:00</span>
            <div className={progress__container}>
              <div className={progress__bar}>
                <div className={progress}></div>
              </div>
            </div>
            <span>5:00</span>
          </li>
          <li className={player__forward}>
            <div className={player__info}>
              <div className={player__cover}></div>
              <div className={player__details}>
                <span></span>
                <span></span>
              </div>
            </div>
            <div onClick={this.props.random}><i className="fa fa-random"></i></div>
            <div onClick={this.props.random}><i className="fa fa-list-ul"></i></div>
            <div onClick={this.props.random}><i className="fa fa-repeat"></i></div>
          </li>
        </ul>
      </div>
    )
  }

}

// Export Player
export default Player
