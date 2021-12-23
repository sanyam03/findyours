import React,{  useEffect} from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import useLocalStorage from "./hooks/useLocalStorage";

import NavBar from "./components/NavBar/NavBar";
import LogIn from "./components/LogIn/LogIn";
import Dashboard from "./components/Dashboard/Dashboard";
import Account from "./components/Account/Account";
import MatchedFaces from "./components/MatchedFaces"
import useToken from './customHooks/useToken'

import "./App.css";


export const TokenContext = React.createContext()
const App = () => {
  const [user, setUser] = useLocalStorage("user", "");
  const {addToken, token, removeToken} = useToken()

  // const history = useHistory();

  /* FOR PURPOSES OF PASSPORT TESTING
  if (!user) {
    history.push("/login");
  }
  */

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Switch>
      <TokenContext.Provider value={{addToken,token,removeToken}}>
        <Route path="/account">
          <Account user={user} setUser={setUser} />
        </Route>
        <Route path="/matched">
          < MatchedFaces  user={user} setUser={setUser} /> 
        </Route>
        {/* <Route path="/users/:userId">
          <Profile user={user} setUser={setUser} />
        </Route> */}
        <Route path="/login">
          <LogIn user={user} setUser={setUser} />
        </Route>
        <Route path="/">
          <Dashboard user={user} setUser={setUser} />
        </Route>
        </TokenContext.Provider>

      </Switch>
    </div>
  );
};

export default App;