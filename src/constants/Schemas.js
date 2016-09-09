import { Schema, arrayOf } from 'normalizr';

const music = new Schema('music');
const user = new Schema('users');
const playlist = new Schema('playlist');

// music.define({
//   user,
// });

playlist.define({
  tracks: arrayOf(music),
});

export const musicSchema = music;
export const playlistSchema = playlist;
export const userSchema = user;
