import User from './User'

function Music(object = {}){
  "use strict"
  let user = object.user ? new User(object.user) : new User()
  this.user           = user,
  this.id             = '',
  this.title          = '',
  this.permalink_url  = '',
  this.artwork_url    = '',
  this.purchase_url   = '',
  this.duration       = '',
  this.genre          = '',
  this.tag_list       = '',
  this.downloadable   = '',
  this.download_url   = '',
  this.stream_url     = '',
  this.status         = ''
  let me = this
  Object.keys(me).forEach( key => me[key] = object[key] || me[key] )
}

export default Music
