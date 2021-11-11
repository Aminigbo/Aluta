import "./App.css";
import store from './redux/store/index'
import { Provider } from 'react-redux'
import {  PersistGate } from 'redux-persist/integration/react'

import Home from "./pages/feeds"
import Login from "./pages/login";
import Reset from "./pages/reset_pwd"
import Create from "./components/create"
import Categories from "./components/categories.js"
import Register from "./pages/register"


import 'bootstrap/dist/css/bootstrap.min.css';
import Matches from "./components/matches.js"
import Leagues from "./components/leagues.js"
import Jackpots from "./components/jackpots.js"
import Account from "./components/account.js"
import Board from "./components/board.js"
import Topup from "./components/topup"
import Withdraw from "./components/withdraw"
import Otp from "./components/otp"
import Admin from "./components/admin"
import Onexone from "./components/1x1"
import Terms from "./components/tc"
import Responsible from "./components/responsible"
import Search from "./components/search"
import Send from "./components/send"
import Jkptpredict from "./components/predict-jkpt"
import Jackpotslip from "./components/jackpot-slip"
import Requestbuz from "./pages/requestBuz"
import Reactions from "./pages/reactions"

// admin view users
import AdminUsers from "./components/admin/includes/users"
import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from "react-router-dom";

export default function App() {
  
  return (
    <Provider store={store().store}>
      <PersistGate loading={null} persistor={store().persistor}>
        <Router>
          <div  className="body"> 
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/reset">
                <Reset />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/jackpots">
                <Jackpots />
              </Route>
              <Route path="/topup">
                <Topup />
              </Route>
              <Route path="/withdraw">
                <Withdraw />
              </Route>
              <Route path="/otp">
                <Otp />
              </Route>
              <Route path="/oneXone">
                <Onexone />
              </Route>

              {/* rout admin */}
              <Route path="/admin">
                <Admin />  
              </Route>
              
              {/* admin view users  AdminUsers*/}
              <Route path="/predict">
                <Leagues />
              </Route>
              
              <Route path="/withdrawal/user/:username/:userId">
                <AdminUsers />
              </Route>
              
              <Route path="/request" >
                <Requestbuz />
              </Route>

              <Route path="/jackpotslip/:user/:id">
                <Jackpotslip />
              </Route>

              <Route path="/predictjkpt/:user/:id">
                <Jkptpredict />
              </Route>

               <Route path="/leagues/:league/:categoryId/:amount">
                <Matches />  
              </Route> 
               <Route path="/leagues/:league">
                <Categories />  
              </Route>
              <Route path="/account/:userId">
                <Account />  
              </Route>
              <Route path="/board/:league/:categoryId/:amount">
                <Board />  
              </Route>
              <Route path="/terms">
                <Terms />  
              </Route>
              <Route path="/responsible">
                <Responsible />  
              </Route>
               <Route path="/transfer">
                <Send />  
              </Route>
              <Route path="/search/:challangeId">
                <Search />  
              </Route>
              <Route path="/reaction/:postId">
                <Reactions />  
              </Route>
              <Route path="/">
                <Home />  
              </Route>

              
              
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}