import { AUTH_METHOD, FOUND_USER, LOADED, LOADING } from '../utils/actions';
export const githubAuth = (data, dispatch, API, state) => {
  const userData = data.user
      console.log(userData);
      dispatch({
        type: AUTH_METHOD,
        auth: data.auth
      })
      dispatch({
        type: FOUND_USER,
        user: userData
      });
      console.log(state)
      API.findGithubUser(userData.id)
      .then(githubData=> {
        console.log(githubData.data.length)
        if(!githubData.data.length){
          let newGithubUserData = {
            username: userData.username,
            github: userData._json,
            auth: 'github',
            location: userData._json.location,
            languages: '',
            favorites: [],
            firstTime: false
          }
          API.addGithubUser(newGithubUserData)
          .then(() => {
            history.push('/newuser')
          }) 
        } else {
          return;
        }
      })
};

export const checkLocalStorageHome = (axios, dispatch) => {
  if(localStorage.getItem('user')) {
    let userData = JSON.parse(localStorage.getItem('user'));
    console.log(userData);
    axios({
      method: 'POST',
      data: userData,
      withCredentials: true,
      url: "/user/login"
    }).then((res) => {
      console.log(res);
      console.log(res.data)
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
    console.log(userData);
    axios({
      method: 'POST',
      data: userData,
      withCredentials: true,
      url: "/user/login"
    }).then((res) => {
      console.log(res);
      console.log(res.data)
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