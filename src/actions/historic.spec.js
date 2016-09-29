import assert from 'assert'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { types, actions } from './historic'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


describe('Historic actions specs', () => {
  it('Should have types', () => {
    assert.ok(types)
  })
  it('Should have actions', () => {
    assert.ok(actions)
  })
  describe('Action Creator (addMusicToHistoricList)',() => {
    let addMusicToHistoricList
    beforeEach(()=>{
      addMusicToHistoricList = actions.addMusicToHistoricList
    })
    it('Should return a action with type "ADD_MUSIC_TO_HISTORIC_LIST"', () => {
      expect(addMusicToHistoricList()).to.have.property('type', types.ADD_MUSIC_TO_HISTORIC_LIST)
    })

    it('Should return a action with a music', () => {
      let music = {id:1}
      expect(addMusicToHistoricList(music)).to.have.property('music', music)
    })

    it('Should return a action with a empty object by default', () => {
      expect(addMusicToHistoricList()).to.be.a('object')
    })
  })

  describe('Action Creator (changeHistoricListOfIds)', () => {
    let changeHistoricListOfIds
    beforeEach(()=>{
      changeHistoricListOfIds = actions.changeHistoricListOfIds
    })
    it('Should return a action of type "CHANGE_LIST_OF_IDS"', () => {
      expect(changeHistoricListOfIds()).to.have.property('type', types.CHANGE_LIST_OF_IDS)
    })
    it('Should return a action with a empty list of ids by default', () => {
      expect(changeHistoricListOfIds().ids).to.have.length(0)
    })
    it('Should return a action with a list of ids', () => {
      let ids = [1,2,3,4,5]
      expect(changeHistoricListOfIds(ids)).to.have.property('ids', ids)
    })
  })

  describe('Action Creator (sortHistoricList)', () => {
    let sortHistoricList, musics, ids
    beforeEach(()=>{
      sortHistoricList = actions.sortHistoricList
      musics = {}
      ids = [1,2,3,4,5]
      ids.forEach((id,i) => {
        let time = new Date()
        time.setMinutes(i)
        musics[id] = { lastPlay: time }
      })
    })
    it('Should return a action with a list of musics ids ordered by last play', () => {
      const expectedActions = [
        { type: types.CHANGE_LIST_OF_IDS, ids: [5,4,3,2,1] }
      ]
      const store = mockStore({
          historic: { ids, musics }
        })
      store.dispatch(sortHistoricList())
      expect(store.getActions()).to.be.deep.equal(expectedActions)
    })
  })

  // describe('Action Creator (addMusicToHistoric)', () => {
  //   let addMusicToHistoric
  //   beforeEach(()=>{
  //     addMusicToHistoric = actions.addMusicToHistoric
  //   })
  //   it('Should return a action with type "ADD_MUSIC_TO_HISTORIC"',() => {
  //     expect(addMusicToHistoric()).to.have.property('type', types.ADD_MUSIC_TO_HISTORIC)
  //   })
  // })
})
