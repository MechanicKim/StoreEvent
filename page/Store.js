import React, {Component} from 'react';
import styled from 'styled-components/native';
import {Alert, StatusBar} from 'react-native';

import {BackButton} from 'react-router-native';
import StoreItems from '../component/StoreItems';
import StoreMenu, {menu} from '../component/StoreMenu';

import {requestStoreEvent, parseStoreHTML} from '../util/store';

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;
const Display = 20;

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      page: 0,
      moreOn: false,
      store: menu.store[props.match.params.idx].code,
      category: '음료',
      type: '11',
    };
  }

  componentDidMount() {
    const {page, store, category, type} = this.state;
    this.requestEvent(page, store, category, type);
  }

  requestEvent = async (page, store, category, type, more = false) => {
    try {
      const html = await requestStoreEvent(page, store, category, type);
      const items = parseStoreHTML(html);
      if (!items.length) {
        throw new Error('상품이 더 이상 존재하지 않습니다.');
      }

      const newItems = more ? this.state.items.concat(items) : items;
      this.setState({
        items: newItems,
        moreOn: newItems.length % Display === 0,
      });
    } catch (error) {
      Alert.alert('', error.message, [{text: '확인'}]);
    }
  };

  render() {
    const {items, store, category, type} = this.state;

    return (
      <Page>
        <StatusBar barStyle="default" />
        <BackButton />
        <StoreItems items={items} more={this.more} />
        <StoreMenu
          store={store}
          category={category}
          type={type}
          selectStore={this.selectStore}
          selectCategory={this.selectCategory}
          selectType={this.selectType}
        />
      </Page>
    );
  }

  selectStore = store => {
    const {category, type} = this.state;
    this.requestEvent(0, store, category, type);
    this.setState({items: [], page: 0, store});
  };

  selectCategory = category => {
    const {store, type} = this.state;
    this.requestEvent(0, store, category, type);
    this.setState({items: [], page: 0, category});
  };

  selectType = type => {
    const {store, category} = this.state;
    this.requestEvent(0, store, category, type);
    this.setState({items: [], page: 0, type});
  };

  more = () => {
    const {page, store, category, type} = this.state;
    let nextPage = page + Display;
    this.requestEvent(nextPage, store, category, type, true);
    this.setState({page: nextPage});
  };
}
