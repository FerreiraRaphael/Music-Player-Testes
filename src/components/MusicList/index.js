import React from 'react'
import Music from '../Music'

const renderMusics = (musics, playingMusicIndex) => musics.ids.map((id, index) => {
    let music = musics.list[id]
    return (<Music key={id} playing={index == playingMusicIndex } index={index} {...music} />)
  })

const MusicList = props => {
  return(
    <div>
      {renderMusics(props.musics, props.playingMusicIndex)}
    </div>
  )
}

MusicList.defaultProps = {
  musics: []
}

export default MusicList
