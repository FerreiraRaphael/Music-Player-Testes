function User(object = {}){
  "use strict"
  this.id             = '',
  this.username       = '',
  this.permalink_url  = '',
  this.avatar_url     = ''
  let me = this
  Object.keys(me).forEach( key => me[key] = object[key] || me[key] )
}
export default User
