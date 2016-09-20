import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'
import {fetchTrack} from '../../../containers/PlayList/modules'

//TODO: Create prototype of input and music info, for add music in playlist

class HomeView extends React.Component{

  constructor(props){
    super(props)
  }

  onChangeHandler(e){
    console.log(e)
  }

  renderMusic(music){
    return (
      <div>
        <div></div>
        <div></div>
      </div>
    )
  }

  render(){
    return (
      <div>
        <input ref={i => this._i = i }></input>
        <button>add</button>

        {/*<h4>Welcome!</h4>
        <img
          alt='This is a duck, because Redux!'
          className={classes.duck}
          src={DuckImage} />*/}
      </div>
    )
  }
}

export default HomeView
