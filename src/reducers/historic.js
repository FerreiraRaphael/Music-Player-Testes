import types from '../constants/actionsTypes'
import { merge } from 'lodash'

const addMusicToHistoricHandler = (state, action) => {
  let {musics, ids} = state
  let { music } = action

  if(!music.id) return state

  if(!musics[music.id]){
    ids = [music.id, ...ids]
  }
  else{
    index = ids.indexOf(music.id)
    ids = [
      ids[index],
      ...ids.slice(0, index),
      ...ids.slice(index)
    ]
  }
  return merge({}, state, { ids, musics: { [music.id]: music }})
}

const ACTION_HANDLERS = {
  [types.ADD_MUSIC_TO_HISTORIC]: addMusicToHistoricHandler
}


const INITIAL_STATE = {
  ids: [],
  musics: {}
}
const historic = (state = INITIAL_STATE, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state,action) : state
}

export default historic
