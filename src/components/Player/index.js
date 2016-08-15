// Import React
import React from 'react';
import classes from './Player.scss'
import icones from './icones.scss'

// Player component
const Player = props => {
  "use strict";
  const { icons, player, player__backward, player__forward, player__container,
    progress, progress__bar, progress__container, player__button, player__volume,
    player__volume__progress__container, player__volume__progress__bar, player__volume__progress,
    player__volume__progress__box, player__collapse, player__menu } = classes

  return (
  <div className={player__container}>
    {/*<div className={`${player__menu}`}>

    </div>*/}
    <ul className={player}>
      <div className={progress__container} onMouseUp={props.onMouseUpHandler_Music}>
        <div className={progress__bar} onMouseDown={props.onMouseDownHandler_Music} onMouseUp={props.onMouseUpHandler_Music}>
          <div className={progress}></div>
        </div>
      </div>
      <li className={player__backward}>
        <div></div><span>Nome Artista - Nome Musica</span>
        <span>0:00&nbsp;&nbsp;/&nbsp;&nbsp;5:00</span>
      </li>
      <li className={player__forward}>
        <div className={`btn ${player__button}`} onClick={props.backward}><i className={`${icones.icon_backward} ${icons}`}/></div>
        <div className={`btn ${player__button}`} onClick={props.togglePlay}><i className={`${icones.icon_play} ${icons}`}/></div>
        <div className={`btn ${player__button}`} onClick={props.forward}><i className={`${icones.icon_forward} ${icons}`}/></div>
        {/*<div className={`btn ${player__collapse}`} onClick={props.collapse}>collapse</div>*/}
        <div className={`btn ${player__button} ${player__volume}`} onClick={props.random}
             onMouseEnter={props.showVolume}
             onMouseLeave={props.hideVolume}>
          <div className={`${player__volume__progress__container}`}>
            <div className={`${player__volume__progress__box}`}
                 onMouseUp={props.onMouseUpHandler_Volume}
                 onMouseDown={props.onMouseDownHandler_Volume}>
            </div>
            <div className={`${player__volume__progress__bar}`} >
              <div className={`${player__volume__progress}`}></div>
            </div>
          </div>
          <i className={`${icones.icon_volume} ${icons}`}/></div>
        <div className={`btn ${player__button}`} onClick={props.random}><i className={`${icones.icon_random} ${icons}`}/></div>
        <div className={`btn ${player__button}`} onClick={props.random}><i className={`${icones.icon_infinity} ${icons}`}/></div>
        <div className={`btn ${player__button}`} onClick={props.random}><i className={`${icones.icon_list} ${icons}`}/></div>
      </li>
    </ul>
  </div>
  )
}

export default Player
