/**
 * Created by raphael on 14/07/16.
 */
// ------------------------------------
// Imports
// ------------------------------------
import { getMusic } from '../../utils/MusicUtils'
import { normalize } from 'normalizr'
import { musicSchema } from '../../constants/Schemas'
import merge from 'lodash/merge'
import union from 'lodash/union'

// ------------------------------------
// Constants
// ------------------------------------
export const CHANGE_MUSIC = 'CHANGE_MUSIC'

// ------------------------------------
// Helpers
// ------------------------------------
const actionObject = (type,payload) => ({type,payload})

const newState = (state, prop, payload) => {
  let newState = Object.assign({},state)

  typeof newState[prop] === 'object' ?
    newState[prop] = Object.assign({},newState[prop], payload):
    newState[prop] = payload

  return newState
}

// ------------------------------------
// Actions
// ------------------------------------
//
// export const addMusicToPlay = (music={}) => {
//   playingMusicIndex: 0,
//   musicId: '',
//   playing: false
//   return {}
// }

export const changeMusic = (playingMusicIndex = 0, musicId="") => {
  return actionObject(CHANGE_MUSIC,{
    playingMusicIndex,
    musicId
  })
}

export const getMusicFromPlayList = index => (dispatch, getState) => {
    let music = getMusic(getState(), index)
    dispatch(changeMusic(index, music.id || ""))
}

export const actions = {
  getMusicFromPlayList
}
// ------------------------------------
// Async Actions
// ------------------------------------

//
//
// export const fetchTrack = url => {
//   return (dispatch) => {
//     fetch(FormatUrl(url))
//       .then(response => response.json())
//       .then(track => console.log(normalize(track, musicSchema)))
//       .catch(e => { throw e } )
//   }
// }
//
// export const asyncActions = {
//   play
//
// }

// ------------------------------------
// Handlers
// ------------------------------------
//

const normalHandler = (state, action) => {
  return (Object.assign({}, state, action.payload))}
const ACTION_HANDLERS = {
    [CHANGE_MUSIC]: normalHandler
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  playingMusicIndex: 0,
  musicId: '',
  playing: false
}
export default function playerReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    // if(handler)console.log(handler(state, action))
    return handler ? handler(state, action) : state
}
