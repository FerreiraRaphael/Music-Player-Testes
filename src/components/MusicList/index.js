import React from 'react'
import Music from '../Music'

const renderMusics = musics => musics.ids.map(id => {
    let music = musics.list[id]
    return (<Music key={id} {...music} />)
  })

const MusicList = props => {
  return(
    <div>
      {renderMusics(props.musics)}
    </div>
  )
}

MusicList.defaultProps = {
  musics: []
}

export default MusicList
