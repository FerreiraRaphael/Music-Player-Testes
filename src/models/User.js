const User = (object = {}) => {
  let model = {
    id:             '',
    username:       '',
    permalink_url:  '',
    avatar_url:     ''
  }
  Object.keys(model).forEach( key => model[key] = object[key] || model[key] )
  return model
}
export default User
