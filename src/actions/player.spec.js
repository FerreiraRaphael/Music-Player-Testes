import * as actions from './player'
import types from '../constants/actionsTypes'

describe('Player actions spec', () => {
  describe('Action creator (changeMusic)', () => {
    it('should return a action with type "CHANGE_MUSIC"',()=>{
      expect(actions.changeMusic()).to.have.property('type', types.CHANGE_MUSIC)
    })

    it('should return a action with property music', () => {
      expect(actions.changeMusic(types.PREV)).to.have.property('music', types.PREV)
    })

    it('should return the next as music by default',() => {
      expect(actions.changeMusic()).to.be.deep.equal({
        type: types.CHANGE_MUSIC,
        music: types.NEXT
      })
    })
  })

  describe('Action creator (toggleShuffle)', () => {
    it('should return a action with type "TOGGLE_SHUFFLE"', () => {
      expect(actions.toggleShuffle()).to.have.property('type', types.TOGGLE_SHUFFLE)
    })
    it('should return a action with property toggle', () => {
      expect(actions.toggleShuffle(false)).to.have.property('toggle', false)
    })
    it('should return true by default', () => {
      expect(actions.toggleShuffle()).to.be.deep.equal({
        type:types.TOGGLE_SHUFFLE,
        toggle: true
      })
    })
  })
})
