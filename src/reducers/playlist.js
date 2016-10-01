import types from '../constants/actionsTypes'
import {merge} from 'lodash'
import {shuffle} from '../utils/playlistUtils'

const addMusicHandler = (state, action) => {
  let {music} = action
  let {id} = music
  let {indexPlayingMusic} = state
  let ids = !state.musics[id] ? [...state.ids, id] : [...state.ids]
  let shuffledIds = [...state.shuffledIds]
  if(state.shuffle && !state.musics[id]){
    shuffledIds = [
      ...ids.slice(indexPlayingMusic)
      ...shuffle(ids.slice(indexPlayingMusic+1, ids.length))
    ]
  }
  let newState = {
    ids,
    shuffledIds,
    musics: {
      [music.id]: music
    }
  }
  return merge({}, state, newState)
}

const ACTION_HANDLERS = {
  [types.ADD_MUSIC]: addMusicHandler
}

const INITIAL_STATE = {
  indexPlayingMusic: 0,
  ids: [],
  shuffledIds: [],
  musics: {},
  repeat: false,
  shuffle: false
}

const playlist = (state = INITIAL_STATE, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default playlist
