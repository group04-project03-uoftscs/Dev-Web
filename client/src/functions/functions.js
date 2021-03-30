import { AUTH_METHOD, FOUND_USER, UPDATE_LOCATION, UPDATE_FAVORITES, UPDATE_LANGUAGES, UPDATE_USER } from '../utils/actions';

export const githubAuth = (data, dispatch, API, state, getFavoriteRecursion, history) => {
  const userData = data.user
      dispatch({
        type: AUTH_METHOD,
        auth: data.auth
      })
      dispatch({
        type: FOUND_USER,
        user: userData
      });
      API.findGithubUser(userData.id)
      .then(githubData=> {
        if(!githubData.data.length){
          let newGithubUserData = {
            username: userData.username,
            email: userData._json.email,
            github: userData._json,
            auth: 'github',
            location: userData._json.location,
            languages: '',
            favorites: [],
            firstTime: false
          }
          dispatch({
            type: UPDATE_LOCATION,
            location: userData._json.location
          })
          API.addNonLocalUser(newGithubUserData)
          .then(() => {
            history.push('/newuser')
          }) 
        } else {
            dispatch({
              type: UPDATE_LOCATION,
              location: githubData.data[0].location
            })
            dispatch({
              type: UPDATE_LANGUAGES,
              languages: githubData.data[0].languages
            })
            getFavoriteRecursion(githubData.data[0].favorites,[],API, favoriteList =>{
              dispatch({ type: UPDATE_FAVORITES, items: favoriteList});
            });
        }
      })
};

export const checkLocalStorageHome = (axios, dispatch) => {
  if(localStorage.getItem('user')) {
    let userData = JSON.parse(localStorage.getItem('user'));
    axios({
      method: 'POST',
      data: userData,
      withCredentials: true,
      url: "/user/login"
    }).then((res) => {
      if(res.data === 'Incorrect login information') {
        alert('Email or password is not correct')
      } else {
        dispatch({
          type: FOUND_USER,
          user: {
            username: userData.username
          }
        });
        dispatch({
          type: AUTH_METHOD,
          auth: 'local'
        });
      }
    });
  }
}

export const checkLocalStorageLanding = (axios, dispatch) => {
  if(localStorage.getItem('user')) {
    let userData = JSON.parse(localStorage.getItem('user'));
    axios({
      method: 'POST',
      data: userData,
      withCredentials: true,
      url: "/user/login"
    }).then((res) => {
      if(res.data === 'Incorrect login information') {
        alert('Email or password is not correct')
      } else {
        dispatch({
          type: FOUND_USER,
          user: {
            username: userData.username
          }
        });
        dispatch({
          type: AUTH_METHOD,
          auth: 'local'
        });
      }
    });
    window.location.replace('/');
  }
}

export const getFavoriteRecursion = (databaseList, favoriteList, API, cb) => {
  if(databaseList.length === favoriteList.length) cb(favoriteList);
  else{
    let fave = databaseList[favoriteList.length];
    if(fave.type === "episodes" || fave.type === "podcasts") {
      let localItems = JSON.parse(localStorage.getItem(fave.type));
      let found = localItems.filter(item => item.id === fave.id);
      if(found.length >= 1) {
        favoriteList.push(found[0]);
        getFavoriteRecursion(databaseList,favoriteList,API,cb)
      }
      else {
        if(fave.type === "episodes"){
          API.getEpisode(fave.id)
            .then(result => {

              let saved = JSON.parse(localStorage.getItem(fave.type));
              saved.push(result.data);
              localStorage.setItem(fave.type, JSON.stringify(saved));
              
              favoriteList.push(result.data);
              getFavoriteRecursion(databaseList,favoriteList,API,cb);
            })
            .catch(err =>{
              console.log(err);
              favoriteList.push(fave);
              getFavoriteRecursion(databaseList,favoriteList,API,cb);
            })
        }
        else if(fave.type === "podcasts"){
          API.getPodcast(fave.id)
            .then(result => {
              let saved = JSON.parse(localStorage.getItem(fave.type));
              saved.push(result.data);
              localStorage.setItem(fave.type, JSON.stringify(saved));
              
              favoriteList.push(result.data);
              getFavoriteRecursion(databaseList,favoriteList,API,cb);
            })
            .catch(err =>{
              console.log(err);
              favoriteList.push(fave);
              getFavoriteRecursion(databaseList,favoriteList,API,cb);
            })
        }
      }
    }
    else {
      favoriteList.push(fave);
      getFavoriteRecursion(databaseList,favoriteList,API,cb);
    }
  }
}

// For google similar to github just with some small changed data
export const googleAuth = (data, dispatch, API, state, getFavoriteRecursion, history) => {
  const userData = data.user
      dispatch({
        type: AUTH_METHOD,
        auth: data.auth
      })
      dispatch({
        type: FOUND_USER,
        user: userData
      });
      API.findGoogleUser(userData.id)
      .then(googleData=> {
        if(!googleData.data.length){
          let newGoogleUserData = {
            username: userData.displayName,
            email: userData.emails[0].value,
            google: userData._json,
            auth: 'google',
            location: '',
            languages: '',
            favorites: [],
            firstTime: false
          }
          dispatch({
            type: UPDATE_LOCATION,
            location: ''
          })
          API.addNonLocalUser(newGoogleUserData)
          .then(() => {
            history.push('/newuser')
          }) 
        } else {
            dispatch({
              type: UPDATE_LOCATION,
              location: googleData.data[0].location
            })
            dispatch({
              type: UPDATE_LANGUAGES,
              languages: googleData.data[0].languages
            })

            if(googleData.data[0].github){
              const _json = {...userData._json};
              const github_json = {
                  "login":  googleData.data[0].github._json.login,
                  "html_url": googleData.data[0].github._json.html_url,
                  "public_repos" : googleData.data[0].github._json.public_repos,
                  "followers": googleData.data[0].github._json.followers,
                  "following": googleData.data[0].github._json.following,
                  "bio": googleData.data[0].github._json.bio
                }
              userData._json = {..._json, ...github_json}
              dispatch({
                type: UPDATE_USER,
                user: userData
              })
            }
            getFavoriteRecursion(googleData.data[0].favorites,[],API, favoriteList =>{
              dispatch({ type: UPDATE_FAVORITES, items: favoriteList});
            });
        }
      })
};
