import React from 'react'
import classnames from 'classnames'
import {music__cover} from '../Player/Player.scss'
import style from './style.scss'

class Music extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mouseOver: false
    }
  }
  clickHandler(){  }
  mouseOverHandler(){ this.setState({mouseOver: true })}
  mouseOutHandler(){ this.setState({mouseOver: false })}

  render(){
    let backgroundImage = {backgroundImage: `url("${this.props.artwork_url}")`}
    return (
      <div className={style.container}>
        <div onMouseOver={()=> this.mouseOverHandler()}
          onMouseOut={()=> this.mouseOutHandler()}
          className={music__cover} style={backgroundImage}>
          <div className={classnames({
            [style.play]: this.state.mouseOver})}></div>
        </div>
        <div className={style.music__info}>
          <span>{ this.props.title }</span>
          <span>{ this.props.user.username }</span>
        </div>
      </div>
    )
  }
}

export default Music
