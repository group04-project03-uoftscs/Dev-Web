const { default: axios } = require("axios");
const router = require("express").Router();
const scrape = require('./scraper');
const Moment = require("moment")
const codewars = require('./codewarsChallenges.json')

// Get Github profile
router.get("/githubuser/:username")
  .get((req,res) =>{
    console.log('getting username')
    axios(`https://api.github.com/users/${req.params.username}`)
      .then(result =>{
        let githubAccount = {
          image: result.data.avatar_url,
          link: result.data.html_url,
          username: result.data.login,
          numRepos: result.data.public_repos,
          numFollowers: result.data.followers,
          numFollowing: result.data.following,
        }
        res.json(githubAccount)
      })
      .catch(err =>{
        console.log(err)
        res.json([])
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
const ListenNotesURL = "https://listen-api.listennotes.com/api/v2";
const ListenNotesBest = ListenNotesURL+`/best_podcasts?genre_id=127`;
const ListenNotesTopic = ListenNotesURL+`/search?q=developer&sort_by_date=1&type=episode&genre_ids=143%2C140%2C163%2C136%2C164&language=English&safe_mode=0`;

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
        type: "podcasts"
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
        type: "episodes"
      }
    });
    cb(episodes)
  })
  .catch(err => {
    console.log(err);
    cb([])
  })
}


router.route("/listennotespodcasts")
  .get((req,res)=>{
    getBestPodcasts(data =>{
      // console.log(data);
      res.json(data);
    })
  })

  router.route("/listennotesepisodes")
  .get((req,res)=>{
    getLatestEpisodes(data =>{
      // console.log(data);
      res.json(data);
    })
  })


// News API - Get World News
const NewsAPIURL_WORLD = "http://newsapi.org/v2/top-headlines?language=en&apiKey=";
const NewsAPIURL_TECH = "http://newsapi.org/v2/top-headlines?language=en&category=technology&apiKey="

const getNews = (url,cb) => {
  axios({
    method: 'get',
    url: url+process.env.NEWS_API,
  })
  .then(result => {
    let articles = result.data.articles.map(article =>{
      return {
        title: article.title,
        url: article.url,
        image: article.urlToImage,
        date: Moment(article.publishedAt).format("MMM DD, YYYY"),
        type: "articles"
      }
    });
    cb(articles)
  })
  .catch(err => {
    console.log(err);
    cb([])
  })
}

router.route("/worldnewsapi")
  .get((req,res)=>{
    getNews(NewsAPIURL_WORLD, data => {
      // console.log(data)
      res.json(data)
    })
  })

router.route("/technewsapi")
  .get((req,res)=>{
    getNews(NewsAPIURL_TECH, data => {
      // console.log(data)
      res.json(data)
    })
  })


// Get HackerNews Data
const getHackerNewsIDs = (cb) => {
  axios("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
  .then(result => {
    cb(result.data.slice(0,10))
  })
}

const getHackerURL = async (id) => {
  const result = await axios(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
  // console.log(result.data)
  let image = await scrape(result.data.url);
  let values = {title:result.data.title, url:result.data.url, image: image, date: Moment(result.data.time*1000).format("MMM DD, YYYY"), id: id, type: "articles"}
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
  .get((req,res) => {
    axios("https://jobs.github.com/positions.json")
    .then(result => {
      console.log(result.data)
      result.data.map(job => {
        return {
          type: job.type,
          location: job.location,
          title: job.title,
          date: Moment(job.created_at).format("MMM DD, YYYY"),
          company: job.company,
          image: job.company_logo,
          type: "jobs"
        }
      })
      res.json(result.data)
    })    
    .catch(err => {
      console.log(err)
      res.json([])
    })
  })


module.exports = router;
