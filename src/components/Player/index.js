// Import React
import React from 'react';
import classNames from 'classnames'
import classes from './Player.scss'
import icones from './icones.scss'

// Player component
const Player = props => {
  "use strict";
  const Progress__classes = classNames({
      [classes.nogradient]: props.progressBar.mouseOver,
      [classes.gradient]: !props.progressBar.mouseOver
  })
  const Progress__styles = {
    width: props.progressBar.width
  }
  const Progress__Mouse__classes = classNames({
      [classes.nogradient]: !props.progressBar.mouseOver,
      [classes.gradient]: props.progressBar.mouseOver
  })
  const Progress__Mouse__style = {
    zIndex: (!props.progressBar.mouseDown && props.progressBar.mouseOver ) ? 1 : 0,
    width: props.progressBar.mouseDown ? 0 : props.progressBar.width__mouse
  }
  const Player__Menu__classes = classNames({ [classes.active]: props.menu })
  const Player__play__pause = classNames({
    [icones.icon_play]: props.MUSIC_STATUS !== 'PLAYING',
    [icones.icon_pause]: props.MUSIC_STATUS === 'PLAYING'
  })
  const togglePlay = ()=>{ props.MUSIC_STATUS === 'PLAYING' ? props.pause() : props.play()}
  return (
  <div className={classes.player__container}>
    <div className={`${classes.player__menu} ${Player__Menu__classes}`}>
      <div className={`btn ${classes.player__button}`} onClick={props.backward}><i className={`${icones.icon_facebook} `}/></div>
      <div className={`btn ${classes.player__button}`} onClick={props.backward}><i className={`${icones.icon_twitter} `}/></div>
      <div className={`btn ${classes.player__button}`} onClick={props.backward}><i className={`${icones.icon_download} `}/></div>
      <div className={`btn ${classes.player__button} ${classes.player__volume}`} onClick={props.random}><i className={`${icones.icon_volume} `}/></div>
      <div className={`btn ${classes.player__button}`} onClick={props.random}><i className={`${icones.icon_random} `}/></div>
      <div className={`btn ${classes.player__button}`} onClick={props.random}><i className={`${icones.icon_infinity} `}/></div>
    </div>
    <ul className={classes.player}>
      <div className={classes.progress__container} onMouseDown={props.onMouseDownHandler_Music}
        onMouseOver={props.onMouseOverHandler} onMouseOut={props.onMouseOutHandler}
        onMouseMove={props.onMouseMoveHandler}>
        <div className={classes.progress__bar}>
          <div style={Progress__Mouse__style} className={`${classes.progress__mouse} ${Progress__Mouse__classes}`}></div>
          <div style={Progress__styles} className={`${classes.progress} ${Progress__classes}`}></div>
        </div>
      </div>
      <li className={classes.player__backward}>
        <div className={`${classes.music__cover} visible-sm-block visible-md-block visible-lg-block`}></div>
        <div className={classes.music__info__container}>
          <span className={classes.music__info}>Nome Artista - Nome Musica</span>
          <span className={classes.music__current__time}>0:00&nbsp;&nbsp;/</span>
          <span className={classes.music__duration}>&nbsp;&nbsp;5:00</span>
        </div>
      </li>
      <li className={classes.player__forward}>
        <div className={`btn ${classes.player__button} hidden-xs`} onClick={props.backward}><i className={`${icones.icon_facebook} `}/></div>
        <div className={`btn ${classes.player__button} hidden-xs`} onClick={props.backward}><i className={`${icones.icon_twitter} `}/></div>
        <div className={`btn ${classes.player__button} hidden-xs`} onClick={props.backward}><i className={`${icones.icon_download} `}/></div>
        <div className={`btn ${classes.player__button} hidden-xs`} onClick={props.backward}><i className={`${icones.icon_backward} `}/></div>
        <div style={ {padding: "6px 5px"} } className={`btn ${classes.player__button}`} onClick={togglePlay}><i className={`${Player__play__pause} ${classes.player__play__pause} `}/></div>
        <div className={`btn ${classes.player__button} ${classes.button__forward}`} onClick={props.forward}><i className={`${icones.icon_forward} `}/></div>
        {/*<div className={`btn ${player__collapse}`} onClick={props.collapse}>collapse</div>*/}
        <div className={`btn ${classes.player__button} hidden-xs ${classes.player__volume}`} onClick={props.random}
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
          <i className={`${icones.icon_volume} `}/>
        </div>
        <div className={`btn ${classes.player__button} hidden-xs`} onClick={props.random}><i className={`${icones.icon_random} `}/></div>
        <div className={`btn ${classes.player__button} hidden-xs`} onClick={props.random}><i className={`${icones.icon_infinity} `}/></div>
        <div className={`btn ${classes.player__button}`} onClick={props.random}><i className={`${icones.icon_list} `}/></div>
        <div className={`btn ${classes.player__button} visible-xs`} onClick={props.toggleMenu}><i className={`${icones.icon_list} `}/></div>
      </li>
    </ul>
  </div>
  )
}


export default Player
