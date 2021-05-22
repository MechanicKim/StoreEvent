import React, {Component} from 'react';
import styled from 'styled-components/native';
import {Alert, StatusBar} from 'react-native';

import {BackButton} from 'react-router-native';
import StoreItems from '../component/StoreItems';
import StoreMenu from '../component/StoreMenu';

import HTMLParser from 'fast-html-parser';

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const URL =
  'https://search.naver.com/p/csearch/content/nqapirender.nhn?pkid=465&where=m';
const Display = 20;

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      page: 0,
      moreOn: false,
      store: 'CU',
      category: '음료',
      type: '11',
    };
  }

  componentDidMount() {
    const {page, store, category, type} = this.state;
    this.requestEvent(page, store, category, type);
  }

  requestEvent = (page, store, category, type, more) => {
    let param = `&start=${page}&display=${Display}&u1=${store}&u2=${category}&u3=${type}&u4=&u5=&u6=&u9=page`;
    fetch(URL + param, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        const itemsHTML = HTMLParser.parse(json.current.html).querySelectorAll(
          'li',
        );
        let items = itemsHTML.map(item => {
          let name = item.querySelector('.item_info .item_name .name_text')
            .text;
          let price = item.querySelector('.item_info .item_price').text;
          if (type.code === '증정') {
            const nameSet = name.split('(' + type.code + ')');
            name = nameSet[0] + '\r\n[증정]' + nameSet[1];
          }
          if (type.code === '할인') {
            const priceSet = price.split('원');
            price = priceSet[1] + '원 -> ' + priceSet[0] + '원';
          }

          return {
            img: item.querySelector('.thumb img').attributes.src,
            name,
            price: price,
          };
        });

        if (!items.length) {
          Alert.alert('알림', '상품이 더 이상 존재하지 않습니다.', [
            {text: '확인'},
          ]);
          return;
        }

        const newItems = more ? this.state.items.concat(items) : items;
        this.setState({
          items: newItems,
          moreOn: newItems.length % Display === 0,
        });
      })
      .catch(error => {
        Alert.alert(
          '알림',
          '상품 목록을 가져오는데 실패했습니다. 네트워크 상태를 확인해 주세요.',
          [{text: '확인'}],
        );
      });
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
