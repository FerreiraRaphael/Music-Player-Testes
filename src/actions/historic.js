const ADD_MUSIC_TO_HISTORIC_LIST = 'ADD_MUSIC_TO_HISTORIC_LIST'
const ADD_MUSIC_TO_HISTORIC = 'ADD_MUSIC_TO_HISTORIC'
const CHANGE_LIST_OF_IDS = 'CHANGE_LIST_OF_IDS'

export const types = {
  ADD_MUSIC_TO_HISTORIC_LIST,
  ADD_MUSIC_TO_HISTORIC,
  CHANGE_LIST_OF_IDS
}

export function addMusicToHistoricList(music = {}){
      return {
        type: ADD_MUSIC_TO_HISTORIC_LIST,
        music: music
      }
}

// export function addMusicToHistoric(music = {}){
//       // return (dispatch, getState)=>{
//       //   let {}
//       // }
// }

export function changeHistoricListOfIds(ids = []){
  return {
    type: CHANGE_LIST_OF_IDS,
    ids
   }
}


export function sortHistoricList(){
  return (dispatch, getState) => {
    let { musics, ids } = getState().historic
    ids.sort((a,b) => {
      if(musics[a].lastPlay < musics[b].lastPlay) return 1
      if(musics[a].lastPlay > musics[b].lastPlay) return -1
      return 0
    })
    dispatch(changeHistoricListOfIds(ids))
  }
}

export const actions = {
  addMusicToHistoricList,
  changeHistoricListOfIds,
  sortHistoricList
}
