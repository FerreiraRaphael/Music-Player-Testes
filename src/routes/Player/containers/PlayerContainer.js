/**
 * Created by raphael on 14/07/16.
 */
import React from 'react'
import { connect } from 'react-redux'
import { play, stop, pause} from '../modules/player'

/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the counter:   */
import SC from 'soundcloud'
import Player from 'components/Player'
import classes from 'components/Player/Player.scss'

class PlayerContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {showVolume : false}
  }
  componentDidMount(){
    console.log('mount')
    SC.initialize({
      client_id: 'f355cf56384ddd44228e0529403558dd',
      redirect_uri: 'http://localhost:3000'
    });
    SC.get('/user/183/tracks').then(function(tracks){
      alert('Latest track: ' + tracks[0].title);
    });
  }
  percentHandler(percent){
    return ((percent.toString().slice(0, 4) * 100) >= 99 ? 100 : percent.toString().slice(0, 4) * 100) + '%'
  }
  onMouseDownHandler_Music(e){
    let progress__container = document.querySelector(`.${classes.progress__container}`),
      progress__bar = progress__container.querySelector(`.${classes.progress__bar}`),
      progress = progress__container.querySelector(`.${classes.progress}`),
      percent = e.nativeEvent.offsetX / progress__bar.clientWidth

    progress.style.width = this.percentHandler(percent)
    progress__container.onmousemove = (e) => {
      percent = e.offsetX / progress__bar.clientWidth
      progress.style.width = this.percentHandler(percent)
    }
  }
  onMouseUpHandler_Music(e){
    let progress__container = document.querySelector(`.${classes.progress__container}`)

    progress__container.onmousemove = e => {}
  }
  onMouseDownHandler_Volume(e){
    let progress__container = document.querySelector(`.${classes.player__volume__progress__box}`),
      progress__bar = document.querySelector(`.${classes.player__volume__progress__bar}`),
      progress = progress__bar.querySelector(`.${classes.player__volume__progress}`),
      percent = ( progress__bar.clientHeight - e.nativeEvent.offsetY )/ progress__bar.clientHeight

    progress.style.height = this.percentHandler(percent)
    progress__container.onmousemove = (e) => {
      console.log(progress__bar.clientHeight - e.offsetY, progress__bar.clientHeight)
      percent = (progress__bar.clientHeight - e.offsetY) / progress__bar.clientHeight
      progress.style.height = this.percentHandler(percent)
    }
  }
  onMouseUpHandler_Volume(e){
    let progress__container = document.querySelector(`.${classes.player__volume__progress__box}`)

    progress__container.onmousemove = e => {}
  }
  showVolume(){ this.setState({ showVolume : true }) }
  hideVolume(){ this.setState({ showVolume : false }) }

  render(){
    return <Player
      onMouseDownHandler_Music={this.onMouseDownHandler_Music.bind(this)}
      onMouseUpHandler_Music={this.onMouseUpHandler_Music.bind(this)}
      onMouseDownHandler_Volume={this.onMouseDownHandler_Volume.bind(this)}
      onMouseUpHandler_Volume={this.onMouseUpHandler_Volume.bind(this)}
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
