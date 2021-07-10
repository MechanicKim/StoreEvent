import React from 'react';
import styled from 'styled-components/native';
import {StatusBar} from 'react-native';

import MainView from '../component/MainView';
import MainMenu from '../component/MainMenu';

const Page = styled.SafeAreaView`
  flex: 1;
`;

export default function Main({history}) {
  return (
    <Page>
      <StatusBar barStyle="default" />
      <MainView />
      <MainMenu linkTo={history.push} />
    </Page>
  );
}
