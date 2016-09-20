// Import React
import React from 'react';
import classNames from 'classnames'
import classes from './Player.scss'
import icones from './icones.scss'
import binder from '../../utils/PublicUtils'
import {appendClientID} from '../../utils/UrlFormaters'

//TODO:
// - Seek bar   OK
// - Play button  OK
// - Forward   OK
// - Backward   OK
// - Volume Change  OK
// - Repeat
// - Shufle
//NOTE: Looks like i'm going to need repeat and shuffle state on redux store,
//      actions of forward and backward, needs to know about this states,
//      needs a random list when shuffle is on,
//      Need to thing in a way of recompose this

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

const secondsHandler = seconds => {
    let minutes = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

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
      repeat: false,
      shuffle: false,
      percent: 0,
      volume: 1,
      currentTime: 0
    }
    binder(this,
          'renderMusicInfoSection','renderControlsSection',
          'renderProgressSection', 'renderExtraActionsSection',
          'mouseOverProgressHandler', 'mouseOutProgressHandler',
          'mouseDownProgressHandler', 'mouseMoveProgressHandler',
          'bindProgressMouseEvents', 'unbindProgressMouseEvents',
          'mouseMoveVolumeHandler', 'bindVolumeMouseEvents',
          'unbindVolumeMouseEvents','mouseDownVolumeHandler',
          'mouseOverVolumeHandler','mouseOutVolumeHandler',
          'onTimeUpdate','onTogglePlay','onBackward',
          'onForward','onToggleShuffle','onToggleRepeat',
          'onToggleVolume','onDownload')
  }

  // ------------------------------------
  // Life Circle Functions
  // ------------------------------------
  componentDidMount(){
    this._audio.addEventListener('timeupdate', this.onTimeUpdate)
  }
  componentWillReceiveProps(nextProps){
      nextProps.playing ? this._audio.play() : this._audio.pause()
  }

  componentDidUpdate(prevProps, prevState){
    let isAnDiferentSongAndIsPlaying = prevProps.music.stream_url !== this.props.music.stream_url && this.props.playing
    if(isAnDiferentSongAndIsPlaying)
      this._audio.play()
  }

  // ------------------------------------
  // Audio Events
  // ------------------------------------
  onTimeUpdate(e){
    if(this.state.mouseDownProgress) return
    let {currentTime, duration} = e.srcElement
    let percent = (Math.floor(currentTime) /  Math.floor(duration)) * 100
    this.setState({currentTime, percent})
  }
  // ------------------------------------
  // Progress Bar Events
  // ------------------------------------
  //TODO: Rename Progress for Seek
  mouseMoveProgressHandler(e){
    let percent = mouseMovePercent(e, this._progress)
    let currentTime = Math.floor(this._audio.duration * percent)
    this.setState({percent: percent * 100})
    this.setState({currentTime})
  }

  bindProgressMouseEvents(){
    document.body.addEventListener('mousemove', this.mouseMoveProgressHandler)
    document.body.addEventListener('mouseup', this.unbindProgressMouseEvents)
    document.body.classList.toggle(classes.noselect, true) }

  unbindProgressMouseEvents(){
    document.body.removeEventListener('mousemove', this.mouseMoveProgressHandler)
    document.body.removeEventListener('mouseup', this.unbindProgressMouseEvents)
    document.body.classList.toggle(classes.noselect, false)
    this.setState({ mouseDownProgress: false})
    this._audio.currentTime = this.state.currentTime
  }

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
    this.setState({volume})
    this._audio.volume = volume
   }

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

  // ------------------------------------
  // Controll actions
  // ------------------------------------
  onTogglePlay(){
    this.props.togglePlay(!this.props.playing)
  }

  onForward(){
    this.props.selectMusicAndPlay(this.props.selectedMusicIndex + 1)
  }

  onBackward(){
    this.props.selectMusicAndPlay(this.props.selectedMusicIndex - 1)
  }

  onToggleShuffle(){
    let { shuffle } = this.state
    this.setState({shuffle:!shuffle})
  }

  onToggleRepeat(){
    let { repeat } = this.state
    this.setState({repeat:!repeat})
  }

  onToggleVolume(){
    let { volume } = this.state
    if(volume > 0){
      this._lastVolume = volume
      this.setState({ volume: 0 })
      this._audio.volume = 0
    }
    else{
      volume = this._lastVolume || 1
      this.setState({ volume })
      this._audio.volume = volume
    }
  }

  onDownload(){

  }


  // ------------------------------------
  // Renders
  // ------------------------------------

  renderMusicInfoSection() { return (
        <div className={classes.player__section}>
          <div className={`${classes.music__cover}`}></div>
          <div className={classes.music__info__container}>
            <span className={classes.music__title}> {this.props.music.title} </span>
            <span className={classes.music__artist}> {this.props.music.user.username} </span>
          </div>
        </div>
      )}

  renderControlsSection(){
    const play__pause = classNames({
      [icones.icon_play]: !this.props.playing,
      [icones.icon_pause]: this.props.playing })

    return (
      <div className={classes.player__section}>
        <div className={`${classes.player__button} `} onClick={this.onBackward}><i className={`${icones.icon_backward} `}/></div>
        <div style={{marginTop: '1px'}} className={`${classes.player__button}`} onClick={this.onTogglePlay}><i className={`${play__pause} ${classes.player__play__pause} `}/></div>
        <div className={`${classes.player__button} ${classes.button__forward}`} onClick={this.onForward}><i className={`${icones.icon_forward} `}/></div>
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
        <div className={classes.player__time}>
          <span className={classes.player__current__time}>{secondsHandler(this.state.currentTime)}&nbsp;&nbsp;</span>
          <span className={classes.player__divider__time}>/</span>
          <span className={classes.player__duration__time}>&nbsp;&nbsp;{millisecondsHandler(this.props.music.duration)}</span>
        </div>
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

  renderExtraActionsSection(){
    const shuffle = classNames({[classes.toggle__button]: this.state.shuffle })
    const repeat = classNames({[classes.toggle__button]: this.state.repeat })
    return (
    //TODO: Random e Inifiny, mudar nomes para shuffle e repeat
    <div className={classes.player__section}>
      <div className={`${classes.player__button} `} onClick={this.props.backward}><i className={`${icones.icon_facebook} `}/></div>
      <div className={`${classes.player__button} `} onClick={this.props.backward}><i className={`${icones.icon_twitter} `}/></div>
      <div className={`${classes.player__button} `} onClick={this.onDownload}><i className={`${icones.icon_download} `}/></div>
      <div className={`${classes.player__button} ${shuffle}`} onClick={this.onToggleShuffle}><i className={`${icones.icon_random} `}/></div>
      <div className={`${classes.player__button} ${repeat}`} onClick={this.onToggleRepeat}><i className={`${icones.icon_infinity} `}/></div>
      <div className={`${classes.player__button}`} onClick={this.onToggleSideBar}><i className={`${icones.icon_list} `}/></div>
      <div className={`${classes.player__button} `} onClick={this.onToggleVolume}> <i className={`${icones.icon_volume} `}/> </div>
      {this.renderVolume()}
    </div>
  )}

  render() {
    return (
      <div className={classes.player__container}>
        <audio src={appendClientID(this.props.music.stream_url+'?')} ref={audio => this._audio = audio}></audio>
        <div className={classes.player}>
          {this.renderMusicInfoSection()}
          {this.renderControlsSection()}
          {this.renderProgressSection()}
          {this.renderExtraActionsSection()}
        </div>
      </div>
      )
    }
}


export default Player
