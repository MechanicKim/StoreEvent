import React from 'react';

import Main from './page/Main';
import GS from './page/GS';
import Store from './page/Store';
import Star from './page/Star';

import {NativeRouter, Route} from 'react-router-native';

export default function App() {
  return (
    <NativeRouter>
      <Route exact path="/" component={Main} />
      <Route exact path="/store/:idx" component={Store} />
      <Route exact path="/gs" component={GS} />
      <Route exact path="/star" component={Star} />
    </NativeRouter>
  );
}
