// Import React
import React from 'react';
import classNames from 'classnames'
import classes from './Player.scss'
import icones from './icones.scss'
import { offsetLeft } from '../../scripts/utils/MouseUtils'

"use strict"
//Helpers
const millisecondsHandler = milliseconds => {
  let minutes = ((milliseconds/(1000*60))%60).toFixed(0)
  let seconds = ((milliseconds/1000)%60).toFixed(0)
  return `${minutes}:${seconds.length === 1 ? `0${seconds}` : seconds}` }

// Player component
class Player extends React.Component {

  constructor(props, ...methods){
    super(props)
    console.log(...methods)
    this.state = {
      mouseDown: false,
      percent: 0,
      playing: false
    }
    this._bind = (...ms) => ms.forEach( m => this[m] = ::this[m] )
    this._bind('renderMusicInfoSection','renderControlsSection',
          'renderProgressSection', 'renderExtraActionsSection',
          'mouseOverProgressHandler', 'mouseOutProgressHandler',
          'mouseDownProgressHandler', 'bindProgressMouseEvents',
          'unbindProgressMouseEvents')
    // this.renderMusicInfoSection = ::this.renderMusicInfoSection
    // this.renderControlsSection = ::this.renderControlsSection
    // this.renderProgressSection = ::this.renderProgressSection
    // this.renderExtraActionsSection = ::this.renderExtraActionsSection
    // this.mouseOverProgressHandler = ::this.mouseOverProgressHandler
    // this.mouseOutProgressHandler = ::this.mouseOutProgressHandler
    // this.mouseDownProgressHandler = ::this.mouseDownProgressHandler
  }

  mouseMoveHandler(e){
    const progress = this
    let diff = e.clientX - offsetLeft(progress)
    let pos = diff < 0 ? 0 : diff
    let percent = pos / progress.offsetWidth
    percent = (percent > 1 ? 1 : percent) * 100;

    this.setState({percent})
    }

  bindProgressMouseEvents(){
    document.body.addEventListener('mousemove', this.mouseMoveHandler.bind(this._progress))
    document.body.addEventListener('mouseup', this.unbindProgressMouseEvents)
    document.body.classList.toggle(classes.noselect, true) }

  unbindProgressMouseEvents(){
    document.body.removeEventListener('mousemove', this.mouseMoveHandler)
    document.body.removeEventListener('mouseup', this.unbindProgressMouseEvents)
    document.body.classList.toggle(classes.noselect, false)
    this.setState({ mouseDownVolume: false}) }

  mouseDownProgressHandler(e){
    this.setState({ mouseDownVolume: true})
    this.bindProgressMouseEvents() }
  // mouseUpProgressHandler(e){
  //   this.setState({ mouseDown: false})
  //   unbindProgressMouseEvents() }



  mouseOverProgressHandler(e){ this.setState({mouseOver: true}) }

  mouseOutProgressHandler(e){ this.setState({mouseOver: false}) }


//VOLUME
  // mouseMoveVolumeHandler(e){
  //   const volume = this._volume
  //   let diff = e.clientX - offsetLeft(volume)
  //   let pos = diff < 0 ? 0 : diff
  //   let percent = pos / volume.offsetWidth
  //   percent = (percent > 1 ? 1 : percent) * 100;
  //
  //   this.setState({percent})
  //   }

  bindVolumeMouseEvents(){
    document.body.addEventListener('mousemove', this.mouseMoveHandler.bind(this._volume))
    document.body.addEventListener('mouseup', this.unbindVolumeMouseEvents)
    document.body.classList.toggle(classes.noselect, true) }

  unbindVolumeMouseEvents(){
    document.body.removeEventListener('mousemove', this.mouseMoveHandler)
    document.body.removeEventListener('mouseup', this.unbindVolumeMouseEvents)
    document.body.classList.toggle(classes.noselect, false)
    this.setState({ mouseDown: false}) }

  mouseDownVolumeHandler(e){
    this.setState({ mouseDown: true})
    this.bindVolumeMouseEvents() }
  // mouseUpVolumeHandler(e){
  //   this.setState({ mouseDown: false})
  //   unbindVolumeMouseEvents() }



  mouseOverVolumeHandler(e){ this.setState({mouseOver: true}) }

  mouseOutVolumeHandler(e){ this.setState({mouseOver: false}) }



  renderMusicInfoSection() { return (
        <div className={classes.player__section}>
          <div className={`${classes.music__cover}`}></div>
          <div className={classes.music__info__container}>
            <span className={classes.music__title}> {this.props.music.title || `NOME MUITO GRANDE DE QUALQUER MUSICA AI `} </span>
            <span className={classes.music__artist}> {this.props.music.user.username || `NOME DO ARTISTA`} </span>
          </div>
        </div>
      )}

  renderControlsSection(){
    const Player__play__pause = classNames({
      [icones.icon_play]: this.props.music.status !== 'PLAYING',
      [icones.icon_pause]: this.props.music.status === 'PLAYING'
    })
    return (
      <div className={classes.player__section}>
        <div className={`${classes.player__button} `} onClick={this.props.backward}><i className={`${icones.icon_backward} `}/></div>
        <div style={{marginTop: '1px'}} className={`${classes.player__button}`} onClick={this.props.onTogglePlayHandler}><i className={`${Player__play__pause} ${classes.player__play__pause} `}/></div>
        <div className={`${classes.player__button} ${classes.button__forward}`} onClick={this.props.forward}><i className={`${icones.icon_forward} `}/></div>
      </div>
    )
  }

  renderProgressSection() {
    const Progress__classes = classNames({
      [classes.progress__mouse]: this.state.mouseOver || this.state.mouseDown })
    const Progress__styles = {
      width: `${this.state.percent}%` }
    return (
      <div className={`${classes.player__middle} ${classes.player__section}`}>
        <div className={classes.progress__container} onMouseDown={this.mouseDownProgressHandler}
          onMouseOver={this.mouseOverProgressHandler} onMouseOut={this.mouseOutProgressHandler}>
          <div className={classes.progress__bar} ref={ progress => this._progress = progress }>
            <div style={Progress__styles} className={`${classes.progress} ${classes.gradient} ${Progress__classes}`}></div>
          </div>
        </div>
        <span className={classes.music__current__time}>0:00&nbsp;&nbsp;/</span>
        <span className={classes.music__duration}>&nbsp;&nbsp;{millisecondsHandler(this.props.music.duration)}</span>
      </div>
    )
  }

  renderVolume() { return (
    <div className={classes.volume__container}>
        <div ref={ volume => this._volume = volume } className={classes.volume__bar}><div className={`${classes.volume__progress} ${classes.gradient}`}></div>
        </div>
    </div>
  )}

  renderExtraActionsSection(){ return (
    <div className={classes.player__section}>
      <div className={`${classes.player__button} `} onClick={this.props.backward}><i className={`${icones.icon_facebook} `}/></div>
      <div className={`${classes.player__button} `} onClick={this.props.backward}><i className={`${icones.icon_twitter} `}/></div>
      <div className={`${classes.player__button} `} onClick={this.props.backward}><i className={`${icones.icon_download} `}/></div>
      <div className={`${classes.player__button} `} onClick={this.props.random}><i className={`${icones.icon_random} `}/></div>
      <div className={`${classes.player__button} `} onClick={this.props.random}><i className={`${icones.icon_infinity} `}/></div>
      <div className={`${classes.player__button}`} onClick={this.props.random}><i className={`${icones.icon_list} `}/></div>
      <div className={`${classes.player__button} `} > <i className={`${icones.icon_volume} `}/> </div>
      {this.renderVolume()}
    </div>
  )}

  render() { return (
  <div className={classes.player__container}>
    <audio></audio>
    <div className={classes.player}>
      {this.renderMusicInfoSection()}
      {this.renderControlsSection()}
      {this.renderProgressSection()}
      {this.renderExtraActionsSection()}
    </div>
  </div>
  )}
}


export default Player
