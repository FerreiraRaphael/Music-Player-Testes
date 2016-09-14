/**
 * Created by raphael on 14/07/16.
 */
// ------------------------------------
// Imports
// ------------------------------------
import { FormatUrl } from '../../utils/UrlFormaters'
import { normalize } from 'normalizr'
import { musicSchema } from '../../constants/Schemas'
import merge from 'lodash/merge'
import union from 'lodash/union'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_MUSIC = 'ADD_MUSIC'

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
export function addMusic ( music = {} ) { return actionObject(ADD_MUSIC, music)}

export const actions = {
    addMusic
}

// ------------------------------------
// Async Actions
// ------------------------------------
export const fetchTrack = url => {
  return (dispatch) => {
    fetch(FormatUrl(url))
      .then(response => response.json())
      .then(track => console.log(normalize(track, musicSchema)))
      .catch(e => { throw e } )
  }
}

export const asyncActions = {
  fetchTrack
}

// ------------------------------------
// Handlers
// ------------------------------------
//

const normalHandler = (state, action) => {
  return (Object.assign({}, state, action.payload))}
const ACTION_HANDLERS = {
    // [ADD_MUSIC]: normalHandler
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  playingMusicIndex: 0,
  music: {user:{}}
}
export default function playerReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    // if(handler)console.log(handler(state, action))
    return handler ? handler(state, action) : state
}
