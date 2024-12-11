import config from "../config/config.js";
const baseURL = `http://localhost:${config.port}/v1/`;

const createURL = (path) => `${baseURL}${path}`;

export const endpoints = {
  daysRoot: `${baseURL}days`,
  registerUser: createURL("users"),
  getAllUsers: createURL("users"),
  getUserByUsername: (username) => createURL(`users/${username}`),
  loginUser: createURL("login"),
  postUserData: (username) => createURL(`days/${username}`),
  getUserData: (username) => createURL(`days/${username}`),
  postDay: (username, date_id) => createURL(`days/${username}/${date_id}`),
  getDay: (username, date_id) => createURL(`days/${username}/${date_id}`),
  postEmotions: (username, date_id) =>
    createURL(`emotions/${username}/${date_id}`),
  getDaysOfMonth: (username, month, year) =>
    createURL(`days/${username}/${month}/${year}`),
  getDaysOfYear: (username, year) => createURL(`days/${username}/${year}`),
  addEmotion: createURL("emotions"),
  deleteEmotion: (index) => createURL(`emotions/${index}`),
};
