import React from 'react'
import { connect } from 'react-redux'
import {actions, asyncActions} from './modules'
import MusicList from '../../components/MusicList'

class PlayList extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchTrack('https://soundcloud.com/aqueleabraco/danne-aquele-abraco-009')
  }

  render(){
    return (
      <MusicList musics={this.props.musics}/>
    )
  }
}

const mapActionCreators = {...actions, ...asyncActions}
const mapStateToProps = (state) => (state.playList)

export default connect(mapStateToProps, mapActionCreators)(PlayList)
