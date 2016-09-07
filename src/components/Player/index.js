// Import React
import React from 'react';
import classNames from 'classnames'
import classes from './Player.scss'
import icones from './icones.scss'

//Helpers
const millisecondsHandler = milliseconds => {
  let minutes = ((milliseconds/(1000*60))%60).toFixed(0)
  let seconds = ((milliseconds/1000)%60).toFixed(0)
  return `${minutes}:${seconds.length === 1 ? `0${seconds}` : seconds}` }

// Player component
const Player = props => {
  "use strict";

  const renderMusicInfoSection = () => (
        <div className={classes.player__section}>
          <div className={`${classes.music__cover}`}></div>
          <div className={classes.music__info__container}>
            <span className={classes.music__title}> {props.music.title || `NOME MUITO GRANDE DE QUALQUER MUSICA AI `} </span>
            <span className={classes.music__artist}> {props.music.user.username || `NOME DO ARTISTA`} </span>
          </div>
        </div>
      )
  const renderControlsSection = () => {
    const Player__play__pause = classNames({
      [icones.icon_play]: props.music.status !== 'PLAYING',
      [icones.icon_pause]: props.music.status === 'PLAYING'
    })
    return (
      <div className={classes.player__section}>
        <div className={`${classes.player__button} `} onClick={props.backward}><i className={`${icones.icon_backward} `}/></div>
        <div style={{marginTop: '1px'}} className={`${classes.player__button}`} onClick={props.onTogglePlayHandler}><i className={`${Player__play__pause} ${classes.player__play__pause} `}/></div>
        <div className={`${classes.player__button} ${classes.button__forward}`} onClick={props.forward}><i className={`${icones.icon_forward} `}/></div>
      </div>
    )
  }

  const renderMiddleSection = () => {
    const Progress__classes = classNames({
        [classes.nogradient]: props.progressBar.mouseOver,
        [classes.gradient]: !props.progressBar.mouseOver
    })
    const Progress__styles = {
      width: props.progressBar.width
    }
    return (
      <div className={`${classes.player__middle} ${classes.player__section}`}>
        <div className={classes.progress__container} onMouseDown={props.onMouseDownHandler_Music}
          onMouseOver={props.onMouseOverHandler} onMouseOut={props.onMouseOutHandler}
          onMouseMove={props.onMouseMoveHandler}>
          <div className={classes.progress__bar}>
            <div style={Progress__styles} className={`${classes.progress} ${Progress__classes}`}></div>
          </div>
        </div>
        <span className={classes.music__current__time}>0:00&nbsp;&nbsp;/</span>
        <span className={classes.music__duration}>&nbsp;&nbsp;{millisecondsHandler(props.music.duration)}</span>
      </div>
    )
  }

  const renderVolume = () => (
    <div className={classes.volume__container}>
        <div className={classes.volume__bar}><div className={`${classes.volume__progress} ${classes.gradient}`}></div>
        </div>
    </div>
  )
  const renderExtraActionsSection = () => (
    <div className={classes.player__section}>
      <div className={`${classes.player__button} `} onClick={props.backward}><i className={`${icones.icon_facebook} `}/></div>
      <div className={`${classes.player__button} `} onClick={props.backward}><i className={`${icones.icon_twitter} `}/></div>
      <div className={`${classes.player__button} `} onClick={props.backward}><i className={`${icones.icon_download} `}/></div>
      <div className={`${classes.player__button} `} onClick={props.random}><i className={`${icones.icon_random} `}/></div>
      <div className={`${classes.player__button} `} onClick={props.random}><i className={`${icones.icon_infinity} `}/></div>
      <div className={`${classes.player__button}`} onClick={props.random}><i className={`${icones.icon_list} `}/></div>
      <div className={`${classes.player__button} `} > <i className={`${icones.icon_volume} `}/> </div>
      {renderVolume()}
    </div>
  )
  return (
  <div className={classes.player__container}>
    <div className={classes.player}>
      {renderMusicInfoSection()}
      {renderControlsSection()}
      {renderMiddleSection()}
      {renderExtraActionsSection()}
    </div>
  </div>
  )
}


export default Player
