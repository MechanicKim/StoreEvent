import React from 'react';
import styled, {css} from 'styled-components/native';

const Wrap = styled.View`
  padding-vertical: 5;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
  background-color: #eeeeee;
`;

const Menu = styled.ScrollView`
  flex-direction: row;
  padding-vertical: 5;
`;

const Item = styled.TouchableOpacity`
  width: 80;
  padding-vertical: 11;
  margin-right: 10;
  justify-content: center;
  align-items: center;
  border-radius: 10;
  ${props => css`
    background-color: ${props.selected ? props.color : '#ffffff'};
  `}
`;

const Text = styled.Text`
  font-size: 14;
  ${props => css`
    color: ${props.selected ? '#ffffff' : '#212121'};
  `}
`;

const Pad = styled.View`
  width: 10;
`;

export const menu = {
  store: [
    {code: 'CU', name: 'CU'},
    {code: '미니스톱', name: '미니스톱'},
    {code: '세븐일레븐', name: '세븐일레븐'},
    {code: '이마트24', name: '이마트24'},
  ],
  category: [
    {code: '음료', name: '음료'},
    {code: '아이스크림', name: '아이스크림'},
    {code: '과자', name: '과자'},
    {code: '간편식사', name: '간편식'},
    {code: '생활용품', name: '생활용품'},
  ],
  type: [
    {code: '11', name: '1+1'},
    {code: '21', name: '2+1'},
    {code: '31', name: '3+1'},
    {code: '증정', name: '증정'},
    {code: '할인', name: '할인'},
  ],
};

export default function GSMenu({
  store,
  category,
  type,
  selectStore,
  selectCategory,
  selectType,
}) {
  let color;
  if (store === 'CU') {
    color = '#8e7cc3';
  } else if (store === '미니스톱') {
    color = '#ffd966';
  } else if (store === '세븐일레븐') {
    color = '#e06666';
  } else {
    color = '#434343';
  }

  return (
    <Wrap>
      <Menu horizontal={true} showsHorizontalScrollIndicator={false}>
        <Pad />
        {menu.store.map((item, index) => (
          <Item
            key={index}
            selected={item.code === store}
            color={color}
            onPress={() => selectStore(item.code)}>
            <Text selected={item.code === store}>{item.name}</Text>
          </Item>
        ))}
      </Menu>
      <Menu horizontal={true} showsHorizontalScrollIndicator={false}>
        <Pad />
        {menu.category.map((item, index) => (
          <Item
            key={index}
            selected={item.code === category}
            color={color}
            onPress={() => selectCategory(item.code)}>
            <Text selected={item.code === category}>{item.name}</Text>
          </Item>
        ))}
      </Menu>
      <Menu horizontal={true} showsHorizontalScrollIndicator={false}>
        <Pad />
        {menu.type.map((item, index) => (
          <Item
            key={index}
            selected={item.code === type}
            color={color}
            onPress={() => selectType(item.code)}>
            <Text selected={item.code === type}>{item.name}</Text>
          </Item>
        ))}
      </Menu>
    </Wrap>
  );
}
