import React, {Component} from 'react';
import styled from 'styled-components/native';
import {Alert, Keyboard, StatusBar} from 'react-native';

import {BackButton} from 'react-router-native';
import StoreItems from '../component/StoreItems';
import GSMenu from '../component/GSMenu';
import GSSearch from '../component/GSSearch';

import {requestGSEvent, parseGSJSON} from '../util/store';

const Page = styled.SafeAreaView`
  flex: 1;
`;

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      page: 1,
      type: 'ONE_TO_ONE',
      keyword: '',
    };
  }

  componentDidMount() {
    const {page, type, keyword} = this.state;
    this.requestItems(page, type, keyword, false);
  }

  requestItems = async (pageNum, type, keyword, more) => {
    try {
      const json = await requestGSEvent(pageNum, type, keyword);
      const items = parseGSJSON(json);
      if (items.length === 0) {
        throw new Error('상품이 더 이상 존재하지 않습니다.');
      }

      if (more) {
        this.setState({items: this.state.items.concat(items)});
      } else {
        this.setState({items});
      }
    } catch (error) {
      Alert.alert('', error.message, [{text: '확인'}]);
    }
  };

  render() {
    const {items, type} = this.state;

    return (
      <Page>
        <StatusBar barStyle="default" />
        <BackButton />
        <StoreItems items={items} more={this.more} />
        <GSMenu type={type} select={this.selectType} />
        <GSSearch onChangeKeyword={this.onChangeKeyword} search={this.search} />
      </Page>
    );
  }

  selectType = item => {
    const {keyword} = this.state;
    this.requestItems(1, item.code, keyword, false);
    this.setState({items: [], page: 1, type: item.code});
  };

  more = () => {
    const {page, type, keyword} = this.state;
    const nextPage = page + 1;
    this.requestItems(nextPage, type, keyword, true);
    this.setState({page: nextPage});
  };

  onChangeKeyword = keyword => {
    this.setState({keyword});
  };

  search = () => {
    const {type, keyword} = this.state;
    Keyboard.dismiss();
    this.requestItems(1, type, keyword, false);
  };
}
