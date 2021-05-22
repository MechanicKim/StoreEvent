import React, {Component} from 'react';
import styled from 'styled-components/native';
import {Alert, Keyboard, StatusBar} from 'react-native';

import {BackButton} from 'react-router-native';
import StoreItems from '../component/StoreItems';
import GSMenu from '../component/GSMenu';
import GSSearch from '../component/GSSearch';

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

  requestItems = (pageNum, type, keyword, more) => {
    let urlParam = `?pageNum=${pageNum}&pageSize=${25}&parameterList=${type}`;
    if (keyword !== '') {
      urlParam += `&searchType=${keyword}&searchWord=${keyword}`;
    }

    fetch(
      `http://gs25.gsretail.com/gscvs/ko/products/event-goods-search${urlParam}`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => this.refreshItems(json, more))
      .catch(error => {
        Alert.alert(
          '알림',
          '상품 목록을 가져오는데 실패했습니다. 네트워크 상태를 확인해 주세요.',
          [{text: '확인'}],
        );
      });
  };

  refreshItems = (json, more) => {
    const data = JSON.parse(json);
    const items = data.results.map(item => {
      let result = {
        img: item.attFileNm,
        name: item.goodsNm,
        price: item.price + '원',
      };

      if (item.eventTypeSp.code === 'GIFT' && item.giftAttFileNm) {
        result.gift = {
          img: item.giftAttFileNm,
          name: item.giftGoodsNm + ' 증정',
        };
      }

      return result;
    });

    if (!items.length) {
      Alert.alert('알림', '상품이 더 이상 존재하지 않습니다.', [
        {text: '확인'},
      ]);
      return;
    }

    if (more) {
      this.setState({items: this.state.items.concat(items)});
    } else {
      this.setState({items});
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
