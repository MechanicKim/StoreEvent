/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
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

export default function Main({match}) {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState({
    page: 0,
    store: menu.store[match.params.idx].code,
    category: '음료',
    type: '11',
  });

  useEffect(() => {
    requestEvent();
  }, [query]);

  async function requestEvent() {
    try {
      const html = await requestStoreEvent(query);
      const newItems = parseStoreHTML(html);
      if (!newItems.length) {
        throw new Error('상품이 더 이상 존재하지 않습니다.');
      }

      if (query.page > 0) {
        setItems([...items, ...newItems]);
      } else {
        setItems(newItems);
      }
    } catch (error) {
      Alert.alert('', error.message, [{text: '확인'}]);
    }
  }

  function selectStore(store) {
    setQuery({
      ...query,
      page: 0,
      store,
    });
  }

  function selectCategory(category) {
    setQuery({
      ...query,
      page: 0,
      category,
    });
  }

  function selectType(type) {
    setQuery({
      ...query,
      page: 0,
      type,
    });
  }

  function more() {
    setQuery({
      ...query,
      page: query.page + Display,
    });
  }

  return (
    <Page>
      <StatusBar barStyle="default" />
      <BackButton />
      <StoreItems items={items} more={more} />
      <StoreMenu
        {...query}
        selectStore={selectStore}
        selectCategory={selectCategory}
        selectType={selectType}
      />
    </Page>
  );
}
