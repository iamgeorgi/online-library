import React, { useState } from 'react';
import './index.css';
import Register from './Public/Register/Register.js';
import Login from './Public/Login/Login.js';
import Header from './Private/Header/Header.js';
import PublicContainer from './Public/PublicContainer.js';
import PrivateContainer from './Private/PrivateContainer.js';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import SingleBook from './Private/SingleBook/SingleBook';
import MainView from './Private/MainView/MainView';
import AllBookReviews from './Private/AllBookReviews/AllBookReviews';
import decode from 'jwt-decode';
import AuthContext from './Auth/AuthContext.js';
import BorrowBook from './Private/BorrowBook/BorrowBook.js';

const App = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(token ? decode(token) : null);
  const [searchData, setSearchData] = useState([]);
  const [searchInput, setSearchInput] = useState([]);

  return (
    <div>
      <AuthContext.Provider value={{ user: user, setUser: setUser }} >
        <BrowserRouter>
          {user
            ?
            <>
              <Header sendData={data => setSearchData(data)} searchInput={(input => setSearchInput(input))} />
              <PrivateContainer>
                <Switch>
                  <Redirect path="/" exact to="/library/books" />
                  <Route path="/library/books" exact render={props => <MainView {...props} dataFromSearch={searchData} searchInput={searchInput} />} />
                  <Route path="/library/books/:id" exact component={SingleBook} />
                  <Route path="/library/books/:id/reviews" exact component={AllBookReviews} />
                  <Route path="/library/books/borrowed/book" exact component={BorrowBook} />
                  <Route path="/library/books/:id/reviews/:reviewsId" exact />
                  <Route path="*" component={NotFound} />
                </Switch>
              </PrivateContainer>
            </>
            :
            <PublicContainer>
              <Switch>
                <Redirect path="/" exact to="/session" />
                <Route path="/session" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="*" component={NotFound} />
                <Route />
              </Switch>
            </PublicContainer>}
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
