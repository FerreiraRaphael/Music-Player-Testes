import User from './User'

const Music = (object = {}) => {
  let user = object.user ? User(object.user) : User()
  let model = {
    user,
    id:             '',
    title:          '',
    permalink_url:  '',
    artwork_url:    '',
    purchase_url:   '',
    duration:       '',
    genre:          '',
    tag_list:       '',
    downloadable:   '',
    download_url:   '',
    stream_url:     ''
  }
  Object.keys(model).forEach( key => model[key] = object[key] || model[key] )
  return model
}

export default Music
