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
    return axios.get("/api/thirdparty/hackernews");
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