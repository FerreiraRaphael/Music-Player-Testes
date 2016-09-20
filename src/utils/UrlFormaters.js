import {SC_CLIENT_ID} from '../constants/Config'

const SC_API_URL = 'http://api.soundcloud.com'

export function appendClientID(url){
  return `${url}client_id=${SC_CLIENT_ID}`}

export function FormatUrl(url){
  return appendClientID(`${SC_API_URL}/resolve?url=${url}&`) }
