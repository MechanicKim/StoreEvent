import React, { Component } from 'react';
import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

import MainView from '../component/MainView';
import MainMenu from '../component/MainMenu';

const Page = styled.SafeAreaView`
  flex: 1
`;

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page>
        <StatusBar barStyle="default" />
        <MainView />
        <MainMenu linkTo={this.props.history.push} />
      </Page>
    );
  }
};
