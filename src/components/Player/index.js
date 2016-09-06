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
    [icones.icon_play]: props.music.status !== 'PLAYING',
    [icones.icon_pause]: props.music.status === 'PLAYING'
  })

  return (
  <div className={classes.player__container}>
    {/* <div className={`${classes.player__menu} ${Player__Menu__classes}`}>
      <div className={`${classes.player__button}`} onClick={props.backward}><i className={`${icones.icon_facebook} `}/></div>
      <div className={`${classes.player__button}`} onClick={props.backward}><i className={`${icones.icon_twitter} `}/></div>
      <div className={`${classes.player__button}`} onClick={props.backward}><i className={`${icones.icon_download} `}/></div>
      <div className={`${classes.player__button} ${classes.player__volume}`} onClick={props.random}><i className={`${icones.icon_volume} `}/></div>
      <div className={`${classes.player__button}`} onClick={props.random}><i className={`${icones.icon_random} `}/></div>
      <div className={`${classes.player__button}`} onClick={props.random}><i className={`${icones.icon_infinity} `}/></div>
    </div> */}
    <ul className={classes.player}>
      <li className={classes.player__backward}>
        <div className={`${classes.music__cover} visible-sm-block visible-md-block visible-lg-block`}></div>
        <div className={classes.music__info__container}>
          <span className={classes.music__title}> {props.music.title || `NOME MUITO GRANDE DE QUALQUER MUSICA AI `} </span>
          <span className={classes.music__artist}> {props.music.user.username || `NOME DO ARTISTA`} </span>
        </div>

      </li>
      <li className={classes.player__middle}>
        <div className={`${classes.player__button} `} onClick={props.backward}><i className={`${icones.icon_backward} `}/></div>
        <div style={{margin: 0}} className={`${classes.player__button}`} onClick={props.onTogglePlayHandler}><i className={`${Player__play__pause} ${classes.player__play__pause} `}/></div>
        <div className={`${classes.player__button} ${classes.button__forward}`} onClick={props.forward}><i className={`${icones.icon_forward} `}/></div>
        <div className={classes.progress__container} onMouseDown={props.onMouseDownHandler_Music}
          onMouseOver={props.onMouseOverHandler} onMouseOut={props.onMouseOutHandler}
          onMouseMove={props.onMouseMoveHandler}>
          <div className={classes.progress__bar}>
            <div style={Progress__Mouse__style} className={`${classes.progress__mouse} ${Progress__Mouse__classes}`}></div>
            <div style={Progress__styles} className={`${classes.progress} ${Progress__classes}`}></div>
          </div>
        </div>
        <span className={classes.music__current__time}>0:00&nbsp;&nbsp;/</span>
        <span className={classes.music__duration}>&nbsp;&nbsp;{millisecondsHandler(props.music.duration)}</span>
      </li>
      <li className={classes.player__forward}>
        <div className={`${classes.player__button} `} onClick={props.backward}><i className={`${icones.icon_facebook} `}/></div>
        <div className={`${classes.player__button} `} onClick={props.backward}><i className={`${icones.icon_twitter} `}/></div>
        <div className={`${classes.player__button} `} onClick={props.backward}><i className={`${icones.icon_download} `}/></div>
        <div className={`${classes.player__button} `} onClick={props.random}><i className={`${icones.icon_random} `}/></div>
        <div className={`${classes.player__button} `} onClick={props.random}><i className={`${icones.icon_infinity} `}/></div>
        <div className={`${classes.player__button}`} onClick={props.random}><i className={`${icones.icon_list} `}/></div>
        <div className={`${classes.player__button} `} >
          {/* <div className={`${classes.player__volume__progress__container}`}>
            <div className={`${classes.player__volume__progress__box}`}
                 onMouseUp={props.onMouseUpHandler_Volume}
                 onMouseDown={props.onMouseDownHandler_Volume}>
            </div>
            <div className={`${classes.player__volume__progress__bar}`} >
              <div className={`${classes.player__volume__progress}`}></div>
            </div>
          </div> */}
          <i className={`${icones.icon_volume} `}/>
        </div>
        <div className={classes.volume__bar} ></div>
      </li>
    </ul>
  </div>
  )
}


export default Player
