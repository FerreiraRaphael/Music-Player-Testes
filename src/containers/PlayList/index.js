import React from 'react'
import { connect } from 'react-redux'
import {actions, asyncActions} from './modules'
import MusicList from '../../components/MusicList'


class PlayList extends React.Component{
  constructor(props){
    super(props)
  }

  onMusicClick(index){
    let { playing, selectedMusicIndex, selectMusicAndPlay, togglePlay } = this.props
    index === selectedMusicIndex ? togglePlay(!playing) : selectMusicAndPlay(index)
  }

  componentDidMount(){
    // this.props.fetchTrack('https://soundcloud.com/aqueleabraco/danne-aquele-abraco-009')
    // this.props.fetchTrack('https://soundcloud.com/featurepr/alok-feat-iro-me-and-you-club-version-feature045')
  }

  render(){
    let {playingMusicIndex, musics} = this.props
    return (
      <MusicList
        onMusicClick={::this.onMusicClick}
        playingMusicIndex={playingMusicIndex}
        musics={musics}/>
    )
  }
}

const mapActionCreators = {...actions, ...asyncActions}
const mapStateToProps = (state) => state.playList

export default connect(mapStateToProps, mapActionCreators)(PlayList)
