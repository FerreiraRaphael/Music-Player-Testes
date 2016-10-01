import {removeOnIndex} from './PlaylistUtils'

describe(`PlaylistUtils spec`, ()=>{
  describe(`removeOnIndex spec`, ()=>{
    it(`should remove element from array`, () => {
      let returnValue = [1,2,3]
      let expectValue = [1,2]
      returnValue = removeOnIndex(returnValue, 2)
      expect(returnValue).to.be.deep.equal(expectValue)
    })
  })
})
