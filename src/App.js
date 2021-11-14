import "./App.css";
import store from './redux/store/index'
import { Provider } from 'react-redux'
import {  PersistGate } from 'redux-persist/integration/react'

import Home from "./pages/feeds"
import Login from "./pages/login";
import Reset from "./pages/reset_pwd"
import Create from "./pages/create"
import Categories from "./components/categories.js"
import Register from "./pages/register"


import 'bootstrap/dist/css/bootstrap.min.css';
import Tour from "./pages/tour.js"
import Events from "./pages/events.js"
import Touring from "./pages/touring.js"
import Account from "./pages/account.js"
import Setschool from "./pages/setschool.js"
import Topup from "./components/topup"
import Withdraw from "./components/withdraw"
import Otp from "./components/otp"
import Admin from "./components/admin"
import Giveaway from "./pages/giveaway"
import Terms from "./components/tc"
import Responsible from "./components/responsible"
import Search from "./components/search"
import Buz from "./pages/buz"
import Marketproducts from "./pages/marketproducts"
import Listmart from "./pages/marketlist"
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
              <Route path="/topup">
                <Topup />
              </Route>
              <Route path="/withdraw">
                <Withdraw />
              </Route>
              <Route path="/otp">
                <Otp />
              </Route>
              <Route path="/giveaway">
                <Giveaway />
              </Route>

              {/* rout admin */}
              <Route path="/admin">
                <Admin />  
              </Route>
              
              {/* admin view users  AdminUsers*/}
              <Route path="/events">
                <Events />
              </Route>
              
              <Route path="/withdrawal/user/:username/:userId">
                <AdminUsers />
              </Route>
              
              <Route path="/request" >
                <Requestbuz />
              </Route>

              <Route path="/listmart">
                <Listmart />
              </Route>

              <Route path="/market/:marketID">
                <Marketproducts />
              </Route>

               <Route path="/tour">
                <Tour />  
              </Route>
              
              <Route path="/touring/:school">
                <Touring />  
              </Route> 

               <Route path="/leagues/:league">
                <Categories />  
              </Route>
              <Route path="/account/:userId">
                <Account />  
              </Route>
              <Route path="/setschool">
                <Setschool />  
              </Route>
              <Route path="/terms">
                <Terms />  
              </Route>
              <Route path="/responsible">
                <Responsible />  
              </Route>
               <Route path="/transfer">
                <Buz />  
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