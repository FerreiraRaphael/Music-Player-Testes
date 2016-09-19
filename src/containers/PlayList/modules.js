// ------------------------------------
// Imports
// ------------------------------------
import { FormatUrl } from '../../utils/UrlFormaters'
import { normalize, arrayOf } from 'normalizr'
import merge from 'lodash/merge'
import union from 'lodash/union'
import { musicsSchema, musicSchema } from '../../constants/Schemas'

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
export function addMusic ( musics = {} ) {
  return actionObject(ADD_MUSIC, musics) }
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
        dispatch(addMusic(track))
      })
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

const addMusicToList = (state, action) => {
  let {list, ids} = state.musics
  let music = action.payload
  let newState = {
    musics :{
      ids: list[music.id] ? [...ids] : [...ids, music.id],
      list: merge({}, list, { [music.id]: music })
      }
    }
  return newState
  }

const normalHandler = (state, action) => {
  console.log(merge({}, state, action.payload))

  debugger
  return merge({}, state, action.payload)}

const ACTION_HANDLERS = {
    [ADD_MUSIC]: addMusicToList
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  musics: {
    ids: [],
    list:{}
  }
}

export default function playlistReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    // if(handler)console.log(handler(state, action))
    return handler ? handler(state, action) : state
}
