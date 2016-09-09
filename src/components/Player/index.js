// Import React
import React from 'react';
import classNames from 'classnames'
import classes from './Player.scss'
import icones from './icones.scss'

"use strict"
// ------------------------------------
// Helpers
// ------------------------------------
const offsetLeft = element => {
  let el = element;
  let x = el.offsetLeft;

  while (el.offsetParent) {
    x += el.offsetParent.offsetLeft;
    el = el.offsetParent;
  }
  return x; }

const mouseMovePercent = (event, element) => {
    let diff = event.clientX - offsetLeft(element)
    let pos = diff < 0 ? 0 : diff
    let percent = pos / element.offsetWidth
    return (percent > 1 ? 1 : percent) }

const millisecondsHandler = milliseconds => {
  let minutes = ((milliseconds/(1000*60))%60).toFixed(0)
  let seconds = ((milliseconds/1000)%60).toFixed(0)
  return `${minutes}:${seconds.length === 1 ? `0${seconds}` : seconds}` }

// ------------------------------------
// Player Component
// ------------------------------------
class Player extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      mouseDownProgress: false,
      mouseOverProgress: false,
      mouseDownVolume: false,
      mouseOverVolume: false,
      percent: 0,
      volume: 1,
      playing: false,
      currentTime: 0,
      duration: 0
    }
    this._bind = (...methods) => methods.forEach( method => this[method] = ::this[method] )
    this._bind('renderMusicInfoSection','renderControlsSection',
          'renderProgressSection', 'renderExtraActionsSection',
          'mouseOverProgressHandler', 'mouseOutProgressHandler',
          'mouseDownProgressHandler', 'mouseMoveProgressHandler',
          'bindProgressMouseEvents', 'unbindProgressMouseEvents',
          'mouseMoveVolumeHandler', 'bindVolumeMouseEvents',
          'unbindVolumeMouseEvents','mouseDownVolumeHandler',
          'mouseOverVolumeHandler','mouseOutVolumeHandler')
  }

  // ------------------------------------
  // Progress Bar Events
  // ------------------------------------
  mouseMoveProgressHandler(e){
    let percent = mouseMovePercent(e, this._progress) * 100
    this.setState({percent}) }

  bindProgressMouseEvents(){
    document.body.addEventListener('mousemove', this.mouseMoveProgressHandler)
    document.body.addEventListener('mouseup', this.unbindProgressMouseEvents)
    document.body.classList.toggle(classes.noselect, true) }

  unbindProgressMouseEvents(){
    document.body.removeEventListener('mousemove', this.mouseMoveProgressHandler)
    document.body.removeEventListener('mouseup', this.unbindProgressMouseEvents)
    document.body.classList.toggle(classes.noselect, false)
    this.setState({ mouseDownProgress: false}) }

  mouseDownProgressHandler(e){
    this.setState({ mouseDownProgress: true})
    this.mouseMoveProgressHandler(e)
    this.bindProgressMouseEvents() }

  mouseOverProgressHandler(e){ this.setState({mouseOverProgress: true}) }

  mouseOutProgressHandler(e){ this.setState({mouseOverProgress: false}) }


  // ------------------------------------
  // Volume Bar Events
  // ------------------------------------

  mouseMoveVolumeHandler(e){
    let volume = mouseMovePercent(e, this._volume)
    this.setState({volume}) }

  bindVolumeMouseEvents(){
    document.body.addEventListener('mousemove', this.mouseMoveVolumeHandler)
    document.body.addEventListener('mouseup', this.unbindVolumeMouseEvents)
    document.body.classList.toggle(classes.noselect, true) }

  unbindVolumeMouseEvents(){
    document.body.removeEventListener('mousemove', this.mouseMoveVolumeHandler)
    document.body.removeEventListener('mouseup', this.unbindVolumeMouseEvents)
    document.body.classList.toggle(classes.noselect, false)
    this.setState({ mouseDownVolume: false}) }

  mouseDownVolumeHandler(e){
    this.setState({ mouseDownVolume: true})
    this.bindVolumeMouseEvents() }

  mouseOverVolumeHandler(e){ this.setState({mouseOverVolume: true}) }

  mouseOutVolumeHandler(e){ this.setState({mouseOverVolume: false}) }



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
      [classes.progress__mouse]: this.state.mouseOverProgress || this.state.mouseDownProgress })
    const Progress__styles = { width: `${this.state.percent}%` }
    return (
      <div className={`${classes.player__middle} ${classes.player__section}`}>
        <div className={classes.progress__container} onMouseDown={this.mouseDownProgressHandler}
          onMouseOver={this.mouseOverProgressHandler} onMouseOut={this.mouseOutProgressHandler}>
          <div className={classes.progress__bar} ref={ progress => this._progress = progress }>
            <div style={Progress__styles} className={`${classes.progress} ${classes.gradient} ${Progress__classes}`}></div>
          </div>
        </div>
        <span className={classes.music__current__time}>{millisecondsHandler(this.state.currentTime)}&nbsp;&nbsp;/</span>
        <span className={classes.music__duration}>&nbsp;&nbsp;{millisecondsHandler(this.state.duration)}</span>
      </div>
    )
  }

  renderVolume() {
    const Volume__classes = classNames({
      [classes.progress__mouse]: this.state.mouseOverVolume || this.state.mouseDownVolume })
    const Volume__style = { width: `${this.state.volume * 100}%`}

    return (
    <div className={classes.volume__container} onMouseOver={this.mouseOverVolumeHandler}
      onMouseOut={this.mouseOutVolumeHandler} onMouseDown={this.mouseDownVolumeHandler}>
        <div ref={ volume => this._volume = volume } className={classes.volume__bar}>
          <div style={Volume__style} className={`${Volume__classes} ${classes.volume__progress} ${classes.gradient}`}></div>
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
