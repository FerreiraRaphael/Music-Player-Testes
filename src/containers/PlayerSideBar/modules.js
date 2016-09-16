// ------------------------------------
// Imports
// ------------------------------------
import { FormatUrl } from '../../utils/UrlFormaters'
import { normalize, arrayOf } from 'normalizr'
import merge from 'lodash/merge'
import union from 'lodash/union'
import { playlistSchema, musicSchema } from '../../constants/Schemas'

// ------------------------------------
// Types
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
export function addMusic ( music = {} ) { debugger;return actionObject(ADD_MUSIC, music)}
// export function testMergeUnion( music ={}) {
//
// }


export const actions = {
    addMusic
}

// ------------------------------------
// Async Actions
// ------------------------------------
export const fetchTrack = url => {
  return (dispatch, getState) => {
    fetch(FormatUrl(url))
      .then(response => response.json())
      .then(track => {
        let playlist = normalize(track, playlistSchema)
        dispatch(addMusic(playlist.entities))
      })
      .catch(e => { throw e } )
  }
}

export const testMergeUnion = track => {
  return (dispatch, getState) => {
    console.log(track.entities,
      merge({}, getState(), {
        playerList:{}}))
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
  debugger
  return merge({}, state, action.payload)}

const ACTION_HANDLERS = {
    [ADD_MUSIC]: normalHandler
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  playlist: {},
  history: {}
}
export default function playerListReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    // if(handler)console.log(handler(state, action))
    return handler ? handler(state, action) : state
}
