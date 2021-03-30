import React from 'react';
import { useStoreContext } from "../utils/GlobalState";
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom';


function PrivateRoute({component : Component, ...rest}) {
  const [state, dispatch] = useStoreContext();

  return (
  <Route 
      {...rest}
      render={props => state.logged ? (
        <Component {...props} />
      ) :
        <Redirect
          to={{
            pathname:"/",
            state: { from: props.location }
          }}
          />
      }
      />
  )
}

export default PrivateRoute;
