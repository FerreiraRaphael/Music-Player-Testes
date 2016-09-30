import types from '../constants/actionsTypes'

export function addMusicToHistoric(music = {}){
      return {
        type: types.ADD_MUSIC_TO_HISTORIC,
        music: music
      }
}
