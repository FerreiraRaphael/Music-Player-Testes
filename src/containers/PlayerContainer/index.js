/**
 * Created by raphael on 14/07/16.
 */
import React from 'react'
import { connect } from 'react-redux'
import { play, stop, pause} from './modules'

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
  constructor(props){
    super(props)
    this.state = {showVolume : false}
  }

  componentDidMount(){
    SC.initialize({
      client_id: 'f355cf56384ddd44228e0529403558dd',
      redirect_uri: 'http://localhost:3000'
    });
  }

  // ------------------------------------
  // Helper Functions
  // ------------------------------------

  percentHandler(percent){ return ((percent.toString().slice(0, 4) * 100) >= 99 ? 100 : percent.toString().slice(0, 4) * 100) + 0.005 + '%' }

  colorProgressBarHandler(toggle){
    let progress__mouse = $(`.${classes.progress__mouse}`),
      progress = $(`.${classes.progress}`),
      zindex = toggle ? 1 : 0

    progress__mouse.toggleClass(classes.gradient, toggle)
    progress__mouse.toggleClass(classes.nogradient, !toggle)
    progress__mouse.css('z-index', zindex)

    progress.toggleClass(classes.gradient, !toggle)
    progress.toggleClass(classes.nogradient, toggle)
  }

  // ------------------------------------
  // Event functions
  // ------------------------------------

  onMouseDownHandler_Music(e){
    let body = $('body'),
      progress__bar = $(`.${classes.progress__bar}`),
      progress = $(`.${classes.progress}`),
      progress__container = $(`.${classes.progress__container}`),
      percent = this.percentHandler(e.nativeEvent.offsetX / progress__bar.width())

    progress.width(percent)
    this.setState({ progressBarMove: true })
    body.on('mousemove', e => {
      this.colorProgressBarHandler(false)
      body.toggleClass(classes.noselect,true)
      percent = this.percentHandler(e.clientX / progress__bar.width())
      progress.width(percent)
    })
    body.on('mouseup', e => {
      body.off('mousemove')
      body.toggleClass(classes.noselect,false)
      this.setState({ progressBarMove: false })
     })
  }

  onMouseOverHandler(e){
    if(this.state.progressBarMove){
      $(`.${classes.progress__container}`).off('mousemove')
      $(`.${classes.progress__mouse}`).width(0)
      this.colorProgressBarHandler(false)
      return
    }
    let percent = this.percentHandler((e.nativeEvent.offsetX / $(`.${classes.progress__bar}`).width())),
      progress__mouse = $(`.${classes.progress__mouse}`),
      progress = $(`.${classes.progress}`)
      progress__mouse.width(percent)
      this.colorProgressBarHandler(progress.width() > e.nativeEvent.offsetX)
      $(`.${classes.progress__container}`).on('mousemove', e => {
        percent = this.percentHandler(e.offsetX / $(`.${classes.progress__bar}`).width())
        progress__mouse.width(percent)
        this.colorProgressBarHandler(progress.width() > e.offsetX)
      })
  }

  toggleMenu(e){
    $(`.${classes.player__menu}`).toggleClass(classes.active)
  }

  onMouseOutHandler(e){
    $(`.${classes.progress__mouse}`).width(0)
    this.colorProgressBarHandler(false)
  }

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
      onMouseDownHandler_Music={::this.onMouseDownHandler_Music}
      onMouseOverHandler={::this.onMouseOverHandler}
      onMouseOutHandler={::this.onMouseOutHandler}
      toggleMenu={this.toggleMenu}
    />
  }
}

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {
    play,
    pause,
    stop
}

const mapStateToProps = (state) => ({
    MUSIC_STATUS: state.MUSIC_STATUS
})

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

export default connect(mapStateToProps, mapActionCreators)(PlayerContainer)
