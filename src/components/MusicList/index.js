import React from 'react'
import Music from '../Music'

const MusicList = props => (
  <div>
    {'teste'}
    {this.props.musics.map( music => <Music {...music} /> )}
  </div>
)
