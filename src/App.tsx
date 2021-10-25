import React, { FC, useState, useEffect} from 'react';
import { BrowserRouter, Route, RouteComponentProps, Switch } from 'react-router-dom'
import  LinearProgress from '@material-ui/core/LinearProgress'
import { onAuthStateChanged } from 'firebase/auth'
import MainHeader from './components/MainHeader'
import routes from './config/route'
import Logging from './config/logging'
import { auth } from './config/firebase'
import AuthRoute from './components/AuthRoute';
//import RegisterCustomer from './pages/auth/customer/signup';
//import auth from 'firebas./pages/auth/signin
import './styles/components/app.scss';
import Header from './components/Header'



const  App:FC<IApp> = props => {

  const [initializing, setInitializing] = useState<boolean>(true)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user){
        Logging.info('user detected')
      } else {
        Logging.info('No user detected')
      }
      setInitializing(false)
    })
  }, [])

  if(initializing){
    return <LinearProgress />
  }

  return (
    <div className="App">
      {/* <MainHeader /> */}
      <BrowserRouter>
        <Switch>
          {routes.map((route, index) => {
            return(
             <Route 
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps<any>) => {
                  if(route.protected)
                    {return <AuthRoute><route.component {...props} /></AuthRoute>}

                  return <route.component 
                  {...props}
                  {...route.props} />
              }}
            />
          )})}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
