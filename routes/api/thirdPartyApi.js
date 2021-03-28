const { default: axios } = require("axios");
const router = require("express").Router();
const scrape = require('./scraper');
const Moment = require("moment")
const codewars = require('./codewarsChallenges.json');

// Get Github profile
router.route("/githubuser/:username")
  .get((req,res) =>{
    console.log('getting username')
    axios(`https://api.github.com/users/${req.params.username}`)
      .then(result =>{
        let githubAccount = {
          id: result.data.id,
          nodeId: result.data.node_id,
          displayName: result.data.name,
          username: result.data.login,
          profileUrl: result.data.url,
          emails: result.data.email,
          provider: "github",
          _json: result.data
        }
        res.json(githubAccount)
      })
      .catch(err =>{
        console.log(err)
        res.json({})
      })
  })

// Get codewars challenges
router.route("/codewars")
  .get((req,res)=>{
    let index = Math.floor(Math.random()*codewars.length)
    // console.log(codewars[index])
    axios(`https://www.codewars.com/api/v1/code-challenges/${codewars[index]}`)
    .then(result =>{
      // console.log(result.data);
      res.json(result.data)
    })
    .catch(err=>{
      console.log(err);
      res.json([])
    })
  })

// Get podcasts
const episodesResponse = require('./apiresponses/search-developer-response.json');
const podcastsResponse = require('./apiresponses/best-tech-response.json');

const ListenNotesURL = "https://listen-api.listennotes.com/api/v2";
const ListenNotesBest = ListenNotesURL+`/best_podcasts?genre_id=127`;
const ListenNotesTopic = ListenNotesURL+`/search?q=developer&sort_by_date=1&type=episode&genre_ids=143%2C140%2C163%2C136%2C164&language=English&safe_mode=0`;


const ListenNotesPodcast = ListenNotesURL + `/best_podcasts?genre_id=127`;

const getBestPodcasts = (cb) => {
  axios({
    method: 'get',
      url: ListenNotesBest,
      headers: {'X-ListenAPI-Key': process.env.LISTENNOTES_API},
  })
  .then(result => {
    // console.log(result.data)
    let podcasts = result.data.podcasts.map(podcast =>{
      return {
        id: podcast.id,
        title: podcast.title,
        url: podcast.website,
        image: podcast.image,
        date: Moment(podcast.latest_pub_date_ms).format("MMM DD, YYYY"),
        type: "podcasts",
        source: "listennotes"
      }
    });
    cb(podcasts)
  })
  .catch(err => {
    console.log(err);
    cb([])
  })
}

const getLatestEpisodes = (cb) => {
  axios({
    method: 'get',
      url: ListenNotesTopic,
      headers: {'X-ListenAPI-Key': process.env.LISTENNOTES_API},
  })
  .then(result => {
    // console.log(result.data)
    let episodes = result.data.results.map(episode =>{
      return {
        id: episode.id,
        title: episode.title_original,
        url: episode.link,
        image: episode.image,
        audio: episode.audio,
        date: Moment(episode.pub_date_ms).format("MMM DD, YYYY"),
        type: "episodes",
        source: "listennotes"
      }
    });
    cb(episodes)
  })
  .catch(err => {
    console.log(err);
    cb([])
  })
}

const getFakePodcasts = (cb) => {
  let result = podcastsResponse;
  let podcasts = result.podcasts.map(podcast =>{
    return {
      id: podcast.id,
      title: podcast.title,
      url: podcast.website,
      image: podcast.image,
      date: Moment(podcast.latest_pub_date_ms).format("MMM DD, YYYY"),
      type: "podcasts",
      source: "listennotes"
    }
  });
  cb(podcasts)
}

const getFakeEpisodes = (cb) => {
  let result = episodesResponse;
  
  let episodes = result.results.map(episode =>{
    return {
      id: episode.id,
      title: episode.title_original,
      url: episode.link,
      image: episode.image,
      audio: episode.audio,
      date: Moment(episode.pub_date_ms).format("MMM DD, YYYY"),
      type: "episodes",
      source: "listennotes"
    }
  });
  cb(episodes)
}

router.route("/listennotespodcasts")
  .get((req,res)=>{
    getBestPodcasts(data =>{ // to be used when using API calls
    // getFakePodcasts(data =>{ // get saved response to save on api
      res.json(data);
    })
  })

router.route("/listennotesepisodes")
.get((req,res)=>{
  getLatestEpisodes(data =>{ // to be used when using API calls
  // getFakeEpisodes(data =>{ // get saved response to save on api
    res.json(data);
  })
})

// const fakeEpisode = require('./apiresponses/episode-response.json')
// router.route("/listennotesepisode/:id")
// .get((req,res)=>{
//     console.log('getting fake episode')
  
//     const episode = {
      
//       id: fakeEpisode.id,
//       title: fakeEpisode.title,
//       url: fakeEpisode.link,
//       image: fakeEpisode.image,
//       audio: fakeEpisode.audio,
//       date: Moment(fakeEpisode.pub_date_ms).format("MMM DD, YYYY"),
//       type: "episodes",
//       source: "listennotes"
//     }
//     res.json(episode)
  
// })

//real api call
router.route("/listennotesepisode/:id")
.get((req,res)=>{
  axios({
    method: 'get',
      url: `${ListenNotesURL}/episodes/${req.params.id}`,
      headers: {'X-ListenAPI-Key': process.env.LISTENNOTES_API},
  })
  .then(result =>{
    // console.log(result.data);
    console.log('getting single episode')
    const episode = {
      
      id: result.data.id,
      title: result.data.title,
      url: result.data.link,
      image: result.data.image,
      audio: result.data.audio,
      date: Moment(result.data.pub_date_ms).format("MMM DD, YYYY"),
      type: "episodes",
      source: "listennotes"
    }
    res.json(episode)
  })
  .catch(err=>{
    console.log(err);
    res.json([])
  })
})

router.route("/listennotespodcast/:id")
.get((req,res)=>{
  axios({
    method: 'get',
      url: `${ListenNotesURL}/podcasts/${req.params.id}?sort=recent_first`,
      headers: {'X-ListenAPI-Key': process.env.LISTENNOTES_API},
  })
  .then(result =>{
    // console.log(result.data);
    const podcast = {
      id: result.data.id,
      title: result.data.title,
      url: result.data.website,
      image: result.data.image,
      date: Moment(result.data.latest_pub_date_ms).format("MMM DD, YYYY"),
      type: "podcasts",
      source: "listennotes"
    }
    res.json(podcast)
    
  })
  .catch(err=>{
    console.log(err);
    res.json([])
  })
})


// News API
const newAPIReponse = require('./apiresponses/newsapi-technology-response.json')
const worldnewAPIReponse = require('./apiresponses/newsapi-world-response.json')
const NewsAPIURL_WORLD = "http://newsapi.org/v2/top-headlines?language=en&apiKey=";
const NewsAPIURL_TECH = "http://newsapi.org/v2/top-headlines?language=en&category=technology&apiKey="

const getNews = (url,cb) => {
  axios({
    method: 'get',
    url: url+process.env.NEWS_API,
  })
  .then(result => {
    let articles = result.data.articles.map((article,index) =>{
      return {
        id: "news-" + Math.floor((Math.random()*index)*1000000),
        title: article.title,
        url: article.url,
        image: article.urlToImage,
        date: Moment(article.publishedAt).format("MMM DD, YYYY"),
        type: "articles",
        source: "newsapi"
      }
    });
    cb(articles)
  })
  .catch(err => {
    console.log(err);
    cb([])
  })
}

const getFakeNews = (url,cb) => {

  let result = newAPIReponse;
  let articles = result.articles.map((article,index) =>{
    return {
      id: "news-" + Math.floor((Math.random()*index)*1000000),
      title: article.title,
      url: article.url,
      image: article.urlToImage,
      date: Moment(article.publishedAt).format("MMM DD, YYYY"),
      type: "articles",
      source: "newsapi"
    }
  });
  cb(articles)
}

router.route("/worldnewsapi")
  .get((req,res)=>{
    getNews(NewsAPIURL_WORLD, data => { // to be used to get data from actual API
      res.json(data)
    })
    // res.json(worldnewAPIReponse); // to get fake news
  })


router.route("/technewsapi")
  .get((req,res)=>{
    getNews(NewsAPIURL_TECH, data => { // to be used to get data from actual API
    // getFakeNews(NewsAPIURL_TECH, data => { // used to save on api request
      // console.log(data)
      getHackerNewsIDs(async (ids) => {
        let promises = ids.map(async (id) =>{
          let article = await getHackerURL(id);
          return article
        })
        const articles = await Promise.all(promises)
        const combinedArticles = interleave(data, articles);
        // res.json(combinedArticles)
        res.write(JSON.stringify(combinedArticles));
        res.end();
      })
    })
  })

const interleave = (arr1, arr2) => {
  let newArr = [];
  let maxLength = Math.max(arr1.length, arr2.length);
  for(let i = 0; i < maxLength; i++){
    if(i < arr1.length) newArr.push(arr1[i]);
    if(i < arr2.length) newArr.push(arr2[i]);
  }
  return newArr;
}

// Get HackerNews Data
const getHackerNewsIDs = (cb) => {
  axios("https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty")
  .then(result => {
    cb(result.data.slice(0,10))
  })
}

const getHackerURL = async (id) => {
  const result = await axios(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
  // console.log(result.data)
  let image = await scrape(result.data.url);
  let values = {title:result.data.title, url:result.data.url, image: image, date: Moment(result.data.time*1000).format("MMM DD, YYYY"), id: id, type: "articles", source: "hackernews"}
  // console.log(values)
  return values;
}

router.route("/hackernews")
  .get((req,res) => {
    getHackerNewsIDs(async (ids) => {
      let promises = ids.map(async (id) =>{
        let article = await getHackerURL(id);
        return article
      })
      const articles = await Promise.all(promises)
      res.json(articles)
    })
})

// Get Github jobs
router.route("/githubjobs")
  .post((req,res) => {
    axios(`https://jobs.github.com/positions.json?description=${req.body.description}&location=${req.body.location}`)
    .then(result => {
      const jobList = result.data.map(job => {
        let time = job.created_at.split(" ");
        return {
          position: job.type,
          location: job.location,
          title: job.title,
          date: `${time[1]} ${time[2]}, ${time[time.length-1]}`,
          company: job.company,
          image: job.company_logo,
          type: "jobs",
          id: job.id,
          url: job.url
        }
      })
      res.json(jobList)
    })    
    .catch(err => {
      console.log(err)
      res.json([])
    })
  })


module.exports = router;
