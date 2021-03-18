import axios from "axios";


export default {
  getUser: function(user) {
    return axios.get("/api/user/"+user)
  },
  saveFavorite: function(user, data) {
    console.log('saving')
    console.log(data)
    return axios.post("/api/user/"+user, data)
  },
  removeFavorite: function(user, data) {
    console.log('deleting')
    console.log(data)
    return axios.patch("/api/user/"+user, data)
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

  getJobs: function() {
    return axios.get("/api/thirdparty/githubjobs");
  },
  
  getCodeWars: function() {
    return axios.get("/api/thirdparty/codewars");
  },
  
  getGithub: function(github) {
    return axios.get("/api/thirdparty/githubuser/"+github);
  },
};