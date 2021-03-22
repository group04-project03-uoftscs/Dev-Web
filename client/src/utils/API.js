import axios from "axios";


export default {

  login: function(data) {
    return axios.post("/api/user/login/", data);
  },
  signup: function(data) {
    return axios.post("/user/signup/", data);
  },
  updateUser: function(user,data) {
    return axios.put("/api/user/"+user, data);
  },
  getDatabaseUser: function(user) {
    return axios.get(`/api/user/${user}`);
  },

  saveFavorite: function(user, data) {
    return axios.post("/api/user/"+user, data);
  },
  removeFavorite: function(user, data) {
    return axios.patch("/api/user/"+user, data);
  },

  getTechNews: function() {
    return axios.get("/api/thirdparty/technewsapi");
  },
  getWorldNews: function() {
    return axios.get("/api/thirdparty/worldnewsapi");
  },
  getLatestEpisodes: function() {
    return axios.get("/api/thirdparty/listennotesepisodes");
  },
  getBestPodcasts: function() {
    return axios.get("/api/thirdparty/listennotespodcasts");
  },
  getEpisode: function(id) {
    return axios.get("/api/thirdparty/listennotesepisode/"+id);
  },
  getPodcast: function(id) {
    return axios.get("/api/thirdparty/listennotespodcast/"+id);
  },
  getJobs: function(data) {
    return axios.post("/api/thirdparty/githubjobs",data);
  },
  getCodeWars: function() {
    return axios.get("/api/thirdparty/codewars");
  },
  getGithub: function(github) {
    return axios.get("/api/thirdparty/githubuser/"+github);
  },

  getUser: function() {
    return axios.get('/user');
  },

  addGithubUser: function(githubUserData) {
    return axios.post('/api/github/add', githubUserData);
  },

  findGithubUser: function(user) {
    return axios.get(`/api/github/${user}`)
  },

  getLocalUserUpdate: function(user, data) {
    return axios.put(`/api/user/${user}`, data);
  }
};