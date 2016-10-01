import types from '../constants/actionsTypes'
import {merge} from 'lodash'
import {shuffleList, removeOnIndex} from '../utils/playlistUtils'

const removeMusicHandler = (state, action) => {
  let {musics, ids, shuffledIds, shuffle} = state
  let {music} = action
  let musicIndex = ids.indexOf(music.id)
  if(musicIndex === -1) return state
  ids = removeOnIndex(ids, musicIndex)
  if(state.shuffle)
    shuffledIds = removeOnIndex(shuffledIds, shuffledIds.indexOf(music.id))
  musics = Object.assign({}, musics)
  delete musics[music.id]
  let newState = {
    ids,
    musics,
    shuffledIds
  }
  return Object.assign({},state, newState)
}

const addMusicHandler = (state, action) => {
  let {music} = action
  let {id} = music
  let {indexPlayingMusic} = state
  let ids = !state.musics[id] ? [...state.ids, id] : [...state.ids]
  let shuffledIds = state.shuffle && !state.musics[id] ?
    shuffleList(ids,indexPlayingMusic) : [...state.shuffledIds]
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
  [types.ADD_MUSIC]: addMusicHandler,
  [types.REMOVE_MUSIC]: removeMusicHandler
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
