// Import React
import React from 'react';
import classes from './Player.scss'
import icones from './icones.scss'

// Player component
const Player = props => {
  "use strict";
  // const { nogradient, gradient, icons, music__cover, music__info__container,
  //   music__info, music__current__time, music__duration, player, player__backward,
  //   player__forward, player__container, progress, progress__mouse, progress__bar,
  //   progress__container, player__button, player__volume, player__volume__progress__container,
  //   player__volume__progress__bar, player__volume__progress, player__volume__progress__box,
  //   player__collapse, player__menu } = classes

  return (
  <div className={classes.player__container}>
    {/*<div className={`${player__menu}`}>

    </div>*/}
    <ul className={classes.player}>
      <div className={classes.progress__container} onMouseDown={props.onMouseDownHandler_Music}
        onMouseOver={props.onMouseOverHandler} onMouseOut={props.onMouseOutHandler}>
        <div className={classes.progress__bar}>
          <div className={`${classes.progress__mouse} ${classes.nogradient}`}></div>
          <div className={`${classes.progress} ${classes.gradient}`}></div>
        </div>
      </div>
      <li className={classes.player__backward}>
        <div className={classes.music__cover}></div>
        <div className={classes.music__info__container}>
          <span className={classes.music__info}>Nome Artista - Nome Musica</span>
          <span className={classes.music__current__time}>0:00&nbsp;&nbsp;/</span>
          <span className={classes.music__duration}>&nbsp;&nbsp;5:00</span>
        </div>
      </li>
      <li className={classes.player__forward}>
        <div className={`btn ${classes.player__button}`} onClick={props.backward}><i className={`${icones.icon_backward} ${classes.icons}`}/></div>
        <div className={`btn ${classes.player__button}`} onClick={props.togglePlay}><i className={`${icones.icon_play} ${classes.icons}`}/></div>
        <div className={`btn ${classes.player__button}`} onClick={props.forward}><i className={`${icones.icon_forward} ${classes.icons}`}/></div>
        {/*<div className={`btn ${player__collapse}`} onClick={props.collapse}>collapse</div>*/}
        <div className={`btn ${classes.player__button} ${classes.player__volume}`} onClick={props.random}
             onMouseEnter={props.showVolume}
             onMouseLeave={props.hideVolume}>
          <div className={`${classes.player__volume__progress__container}`}>
            <div className={`${classes.player__volume__progress__box}`}
                 onMouseUp={props.onMouseUpHandler_Volume}
                 onMouseDown={props.onMouseDownHandler_Volume}>
            </div>
            <div className={`${classes.player__volume__progress__bar}`} >
              <div className={`${classes.player__volume__progress}`}></div>
            </div>
          </div>
          <i className={`${icones.icon_volume} ${classes.icons}`}/>
        </div>
        <div className={`btn ${classes.player__button}`} onClick={props.random}><i className={`${icones.icon_random} ${classes.icons}`}/></div>
        <div className={`btn ${classes.player__button}`} onClick={props.random}><i className={`${icones.icon_infinity} ${classes.icons}`}/></div>
        <div className={`btn ${classes.player__button}`} onClick={props.random}><i className={`${icones.icon_list} ${classes.icons}`}/></div>
      </li>
    </ul>
  </div>
  )
}


export default Player
