/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
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

export default function GS() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState({
    page: 1,
    type: 'ONE_TO_ONE',
    keyword: '',
  });

  useEffect(() => {
    requestItems();
  }, [query]);

  async function requestItems() {
    try {
      const json = await requestGSEvent(query);
      const newItems = parseGSJSON(json);
      if (newItems.length === 0) {
        throw new Error('상품이 더 이상 존재하지 않습니다.');
      }

      if (query.page > 1) {
        setItems([...items, ...newItems]);
      } else {
        setItems(newItems);
      }
    } catch (error) {
      Alert.alert('', error.message, [{text: '확인'}]);
    }
  }

  function requestMore() {
    setQuery({
      ...query,
      page: query.page + 1,
    });
  }

  function selectType(code) {
    setQuery({
      ...query,
      page: 1,
      type: code,
    });
  }

  function search(keyword) {
    Keyboard.dismiss();
    setQuery({
      ...query,
      page: 1,
      keyword,
    });
  }

  return (
    <Page>
      <StatusBar barStyle="default" />
      <BackButton />
      <StoreItems items={items} more={requestMore} />
      <GSMenu type={query.type} select={selectType} />
      <GSSearch search={search} />
    </Page>
  );
}
