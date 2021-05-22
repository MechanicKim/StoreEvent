import React from 'react';
import styled, {css} from 'styled-components/native';

const Menu = styled.View`
  flex-direction: row;
  padding-vertical: 10;
  padding-horizontal: 10;
  background-color: #eeeeee;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
`;

const Item = styled.TouchableOpacity`
  padding-vertical: 10;
  padding-horizontal: 10;
  margin-horizontal: 3;
  justify-content: center;
  align-items: center;
  border-radius: 10;
  ${props => css`
    background-color: ${props.selected ? '#3c78d8' : '#ffffff'};
  `}
`;

const Text = styled.Text`
  font-size: 15;
  ${props => css`
    color: ${props.selected ? '#ffffff' : '#212121'};
  `}
`;

const menuItems = [
  {code: 'ONE_TO_ONE', name: '1+1'},
  {code: 'TWO_TO_ONE', name: '2+1'},
  {code: 'GIFT', name: '덤증정'},
];

export default function GSMenu(props) {
  const {type, select} = props;

  return (
    <Menu>
      {menuItems.map((item, index) => (
        <Item
          key={index}
          selected={item.code === type}
          onPress={() => select(item)}>
          <Text selected={item.code === type}>{item.name}</Text>
        </Item>
      ))}
    </Menu>
  );
}
