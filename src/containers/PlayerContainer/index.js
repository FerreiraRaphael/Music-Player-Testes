/**
 * Created by raphael on 14/07/16.
 */
import React from 'react'
import { connect } from 'react-redux'
import {actions, asyncActions} from './modules'

/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the counter:   */
import SC from 'soundcloud'
import Player from 'components/Player'
import classes from 'components/Player/Player.scss'

class PlayerContainer extends React.Component{

  // ------------------------------------
  // Life Circle Functions
  // ------------------------------------
  constructor(props,dispatch){
    super(props)
  }

  componentDidMount(){
    // SC.initialize({
    //   client_id: __SC_CLIENT_ID__,
    //   redirect_uri: __SC_REDIRECT_URI__
    // });
    // this.props.fetchTrack('https://soundcloud.com/juke-ellington/azide-x-rfen-blowin-os-juke-ellington-remix')
    // console.log(this.props.music)
    // this.props.streamTrack(this.props.music)
  }

  // ------------------------------------
  // Helper Functions
  // ------------------------------------

  colorProgressBarHandler(width){
    let logic = Number(width.replace('px', '')) < Number(this.props.progressBar.width.replace('px',''))
    this.props.mouseOverProgressBar({ width__mouse: width, mouseOver: logic}) }

  // ------------------------------------
  // Event functions
  // ------------------------------------
  eventFunctions(){
    return {
      onMouseDownHandler_Music:(e)=>{
        const body = document.querySelector('body')
        this.props.mouseDownProgressBar({width: `${e.nativeEvent.clientX}px`})
        body.classList.toggle(classes.noselect,true)
        let bodyMouseMove = e => this.props.mouseMoveProgressBar({width: `${e.clientX}px`})
        body.addEventListener('mousemove', bodyMouseMove)
        body.addEventListener('mouseup', e => {
          body.removeEventListener('mousemove', bodyMouseMove)
          this.props.mouseUpProgressBar()
          document.querySelector('body').classList.toggle(classes.noselect,false)
        })},

      onMouseOverHandler:(e)=>{
        if(this.props.progressBar.mouseDown) return
        this.colorProgressBarHandler(`${(e.nativeEvent.clientX)}px`) },

      onMouseMoveHandler:(e)=>{
        if(this.props.progressBar.mouseDown) return
        this.colorProgressBarHandler(`${(e.nativeEvent.clientX)}px`) },

      onToggleMenuHandler:(e)=>{ this.props.toggleMenu(!this.props.menu) },

      // onTogglePlayHandler:()=>{ this.props.music.status === 'PLAYING' ?
      //   this.props.pause() : this.props.play() },
      onTogglePlayHandler:()=>{ this.props.togglePlayer(this.props.music.status === 'PLAYING')},

      onMouseOutHandler:(e)=>{ this.props.mouseOutProgressBar() }
    }}

  // showVolume(){ this.setState({ showVolume : true }) }
  //
  // hideVolume(){ this.setState({ showVolume : false }) }
  //
  // onMouseDownHandler_Volume(e){
  //   let progress__container = document.querySelector(`.${classes.player__volume__progress__box}`),
  //     progress__bar = document.querySelector(`.${classes.player__volume__progress__bar}`),
  //     progress = progress__bar.querySelector(`.${classes.player__volume__progress}`),
  //     percent = ( progress__bar.clientHeight - e.nativeEvent.offsetY )/ progress__bar.clientHeight
  //
  //   progress.style.height = this.percentHandler(percent)
  //   progress__container.onmousemove = (e) => {
  //     console.log(progress__bar.clientHeight - e.offsetY, progress__bar.clientHeight)
  //     percent = (progress__bar.clientHeight - e.offsetY) / progress__bar.clientHeight
  //     progress.style.height = this.percentHandler(percent)
  //   }
  // }
  // onMouseUpHandler_Volume(e){
  //   let progress__container = document.querySelector(`.${classes.player__volume__progress__box}`)
  //
  //   progress__container.onmousemove = e => {}
  // }
  // collapse(){ $(`.${classes.player__menu}`).toggleClass(classes.active) }

  render(){
    return <Player
      //onMouseDownHandler_Music={::this.onMouseDownHandler_Music}
      //onMouseOverHandler={::this.onMouseOverHandler}
      //onMouseOutHandler={::this.onMouseOutHandler}
      //onMouseMoveHandler={::this.onMouseMoveHandler}
      {...::this.eventFunctions()}
      {...this.props}
    />
  }
}

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {...actions, ...asyncActions}
const mapStateToProps = (state) => (state.player)

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

 import { createSelector } from 'reselect'
 const counter = (state) => state.counter
 const tripleCount = createSelector(counter, (count) => count * 3)
 const mapStateToProps = (state) => ({
 counter: tripleCount(state)
 })

 Selectors can compute derived data, allowing Redux to store the minimal possible state.
 Selectors are efficient. A selector is not recomputed unless one of its arguments change.
 Selectors are composable. They can be used as input to other selectors.
 https://github.com/reactjs/reselect    */
import Music from '../../models/Music'
PlayerContainer.propTypes = {
  menu: React.PropTypes.bool.isRequired,
  music: React.PropTypes.instanceOf(Music).isRequired,
  progressBar: React.PropTypes.shape({
    mouseDown: React.PropTypes.bool.isRequired,
    mouseOver: React.PropTypes.bool.isRequired,
    width: React.PropTypes.string.isRequired,
    width__mouse: React.PropTypes.string.isRequired
  }).isRequired,
  player: React.PropTypes.object,
  pause: React.PropTypes.func.isRequired,
  play: React.PropTypes.func.isRequired,
  stop:React.PropTypes.func.isRequired,
  toggleMenu:React.PropTypes.func.isRequired,
  mouseDownProgressBar:React.PropTypes.func.isRequired,
  mouseUpProgressBar:React.PropTypes.func.isRequired,
  mouseMoveProgressBar:React.PropTypes.func.isRequired,
  mouseOverProgressBar:React.PropTypes.func.isRequired,
  mouseOutProgressBar:React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionCreators)(PlayerContainer)
