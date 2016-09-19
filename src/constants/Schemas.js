import { Schema, arrayOf } from 'normalizr';

const music = new Schema('musics');
const user = new Schema('users');

// music.define({
//   user,
// });

export const musicSchema = music;
export const userSchema = user;
