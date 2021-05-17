import React, { Component } from 'react';
import styled, { css } from 'styled-components/native';
import { Alert, StatusBar } from 'react-native';

import { BackButton } from 'react-router-native';
import Item from '../component/Item';
import More from '../component/More';
import Footer from '../component/Footer';

import HTMLParser from 'fast-html-parser';

const Page = styled.SafeAreaView`
  flex: 1;
  padding-left: 10;
  padding-top: 10;
  padding-right: 10;
  padding-bottom: 10;
  background-color: #ffffff;
`;

const Scroll = styled.ScrollView`
  flex: 1;
`;

const Line = styled.View`
  margin-top: 5;
  margin-bottom: 5;
  flex-direction: row;
`;

const Text = styled.Text`
  ${props => css`
    font-weight: ${props.bold ? 'bold' : 'normal'}
    font-size: ${props.size || 15};
    color: ${props.color || '#000000'};
  `}
`;

const MenuData = {
  type: [
    { code: 23, name: '1+1' },
    { code: 24, name: '2+1' },
    { code: 49, name: '3+1' },
    { code: 1, name: '아침애' },
    { code: 2, name: '음료할인' }
  ]
}

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], page: 1, type: MenuData.type[0] };
  }

  componentDidMount() {
    const { page, type } = this.state;
    const listType = page === 1 ? 0 : 1;
    this.requestEvent(page, listType, type.code, false);
  }

  requestEvent = (page, type, condition, more) => {
    let urlParam = `?gdIdx=0&pageIndex=${page}&listType=${type}&searchCondition=${condition}`;
    fetch('http://cu.bgfretail.com/event/plusAjax.do' + urlParam, {
      method: 'POST'
    })
    .then(response => response.text())
    .then(text => this.refreshItems(text, more))
    .catch(error => {
      Alert.alert(
        '알림', '상품 목록을 가져오는데 실패했습니다. 네트워크 상태를 확인해 주세요.',
        [{ text: '확인' }]
      );
    });
  }

  requestEvent2 = (no, gdIdx, page, more) => {
    let urlParam = `?gdIdx=${gdIdx}&pageIndex=${page}`;
    fetch(`http://cu.bgfretail.com/event/morningAjax${no}.do` + urlParam, {
      method: 'POST'
    })
    .then(response => response.text())
    .then(text => this.refreshItems(text, more))
    .catch(error => {
      Alert.alert(
        '알림', '상품 목록을 가져오는데 실패했습니다. 네트워크 상태를 확인해 주세요.',
        [{ text: '확인' }]
      );
    });
  }

  refreshItems = (text, more) => {
    const itemsHTML = HTMLParser.parse(text).querySelectorAll('li');
    const items = itemsHTML.map(item => {
      const img = item.querySelector('.photo img').attributes.src;
      const name = item.querySelector('.prodName').text;
      let price = item.querySelector('.prodPrice span').text + '원';
      if (this.state.type.code === 2) {
        price = item.querySelector('.prodPrice strong').text + ' -> ' + price;
      }

      return { img, name, price };
    });

    if (!items.length) {
      Alert.alert('알림', '상품이 더 이상 존재하지 않습니다.', [{ text: '확인' }]);
      return;
    }

    if (more) {
      this.setState({ items: this.state.items.concat(items) });
    } else {
      this.setState({ items });
    }
  }

  render() {
    const { items, type } = this.state;

    return (
      <>
        <StatusBar barStyle="default" />
        <BackButton />
        <Page>
          <Scroll>
          {
            items.map((item, index) => (
              <Item key={index} Line={Line} Text={Text} item={item} />
            ))
          }
          {type.code > 2 &&
            <More Line={Line} more={this.more} />
          }
          </Scroll>
          <Footer Text={Text} menu={MenuData} data={{ type }}
                  selectType={this.selectType} />
        </Page>
      </>
    );
  }

  selectType = type => {
    if (type.code <= 2) this.requestEvent2(type.code, 0, 1, false);
    else this.requestEvent(1, 0, type.code, false);
    this.setState({ items: [], page: 1, type });
  };

  more = () => {
    const { page, type } = this.state;
    const nextPage = page + 1;
    if (type.code <= 2) this.requestEvent2(type.code, 0, nextPage, true);
    else this.requestEvent(nextPage, 1, type.code, true);
    this.setState({ page: nextPage });
  };
};
