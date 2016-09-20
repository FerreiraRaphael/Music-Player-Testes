import React from 'react'
import Music from '../Music'

const renderMusics = (musics, playingMusicIndex, onClick) => musics.ids.map((id, index) => {
    let music = musics.list[id]
    return (<Music key={id}
                    playing={index == playingMusicIndex }
                    index={index}
                    onClick={onClick}
                    {...music} />)
  })

const MusicList = props => {
  return(
    <div>
      {renderMusics(props.musics, props.playingMusicIndex, props.onMusicClick)}
    </div>
  )
}

MusicList.defaultProps = {
  musics: []
}

export default MusicList
