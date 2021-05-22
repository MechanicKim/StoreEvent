import React from 'react';
import styled from 'styled-components/native';

const Menu = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Item = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
  border-width: 1;
  border-color: #fafafa;
`;

const Text = styled.Text`
  font-size: 23;
  color: #ffffff;
  font-weight: bold;
`;

export default function MainMenu(props) {
  return (
    <>
      <Menu>
        <Item
          color="#3c78d8"
          activeOpacity={0.9}
          onPress={() => props.linkTo('/gs')}>
          <Text>GS25</Text>
        </Item>
        <Item
          color="#8e7cc3"
          activeOpacity={0.9}
          onPress={() => props.linkTo('/store/0')}>
          <Text>CU</Text>
        </Item>
        <Item
          color="#ffd966"
          activeOpacity={0.9}
          onPress={() => props.linkTo('/store/1')}>
          <Text>미니스톱</Text>
        </Item>
      </Menu>
      <Menu>
        <Item
          color="#e06666"
          activeOpacity={0.9}
          onPress={() => props.linkTo('/store/2')}>
          <Text>세븐일레븐</Text>
        </Item>
        <Item
          color="#434343"
          activeOpacity={0.9}
          onPress={() => props.linkTo('/store/3')}>
          <Text>이마트24</Text>
        </Item>
        <Item
          color="#00704A"
          activeOpacity={0.9}
          onPress={() => props.linkTo('/star')}>
          <Text>스타벅스</Text>
          <Text>RTD</Text>
        </Item>
      </Menu>
    </>
  );
}
