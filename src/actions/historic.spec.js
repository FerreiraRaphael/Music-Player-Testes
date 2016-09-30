import * as actions from './historic'
import types from '../constants/actionsTypes'


describe('Historic actions specs', () => {

  describe('Action Creator (addMusicToHistoricList)',() => {
    let addMusicToHistoric
    beforeEach(()=>{
      addMusicToHistoric = actions.addMusicToHistoric
    })

    it('Should return a action with type "ADD_MUSIC_TO_HISTORIC"', () => {
      expect(addMusicToHistoric()).to.have.property('type', types.ADD_MUSIC_TO_HISTORIC)
    })

    it('Should return a action with a music', () => {
      let music = {id:1}
      expect(addMusicToHistoric(music)).to.have.property('music', music)
    })

    it('Should return a action with a empty object by default', () => {
      expect(addMusicToHistoric()).to.be.a('object')
    })
  })

})
