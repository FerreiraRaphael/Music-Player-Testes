import React from 'react'
import Music from '../Music'

const MusicList = props => (
  <div>
    {this.props.musics.map( music => <Music {...music} /> )}
  </div>
)
