import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'
import {fetchTrack} from '../../../containers/PlayList/modules'
import { connect } from 'react-redux'
import {actions, asyncActions} from '../../../containers/PlayList/modules'
//TODO: Create prototype of input and music info, for add music in playlist

class HomeView extends React.Component{

  constructor(props){
    super(props)
    this.state = { music: {}}
  }

  onChangeHandler(e){
    this.props.fetchTrackAndShowInfo(this._i.value)
  }

  onClick(){
    this.props.addMusic(this.props.fetchedMusic)
  }

  renderMusic(music){
    return (
      <div>
        <div >
          <img src={music.artwork_url}></img>
        </div>
        <div>
          <span>{music.title}</span>
          <span>{music.user.username}</span>
        </div>
        <div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      )
  }

  render(){
    return (
      <div>
        <input onChange={::this.onChangeHandler} ref={i => this._i = i }></input>
        <button onClick={::this.onClick}>add</button>
        {this.props.fetchedMusic.id ? this.renderMusic(this.props.fetchedMusic) : <div/>}
        {/*<h4>Welcome!</h4>
        <img
          alt='This is a duck, because Redux!'
          className={classes.duck}
          src={DuckImage} />*/}
      </div>
    )
  }
}

const mapActionCreators = {...actions, ...asyncActions}
const mapStateToProps = (state) => (state.playList)

export default connect(mapStateToProps, mapActionCreators)(HomeView)
