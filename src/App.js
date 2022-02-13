import React from 'react';

import s from './App.module.scss';
import { Switch, Route } from 'react-router-dom';

import { ReactComponent as IconWallet } from '../src/icons/IconWallet.svg';
import RegistrationPage from 'Pages/RegistrationPage/RegistrationPage';
function App() {
  return (
    <div className={s.container}>
      <Switch>
        <Route path="/" component={RegistrationPage} />
      </Switch>
      <header>
        <h1 className={s.logo}>
          <IconWallet />
          Wallet
        </h1>
      </header>
      <main>main</main>
      <footer>footer</footer>
    </div>
  );
}

export default App;
