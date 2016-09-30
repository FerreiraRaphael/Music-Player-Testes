import historic from './historic'
import {addMusicToHistoric} from '../actions/historic'
describe('Historic reducer spec', () => {
  let musics, ids, state
  beforeEach(() => {
    ids = []
    musics = {}
    state = {ids, musics}
  })
  it('Should be a function',() => {
    expect(historic).to.be.a('function')
  })
  it('Should add the music', () => {
    let music = { id: 1 }
    expect(historic(state, addMusicToHistoric(music))).to.be.deep.equal({
      ids:[1],
      musics: {1: {id: 1} }
    })
  })
  it('Should put the last music added at the top of the list', () => {
    let music = { id: 1 }
    state = historic(state, addMusicToHistoric(music))
    music.id = 2
    expect(historic(state,addMusicToHistoric(music))).to.be.deep.equal({
      ids:[2,1],
      musics: {
        1: {id: 1},
        2: {id: 2}
      }
    })
  })
  it('should return the same state if nothing is passed', () => {
    expect(historic(state,addMusicToHistoric())).to.be.deep.equal(state)
  })
})
