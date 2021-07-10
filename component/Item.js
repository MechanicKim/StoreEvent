import React from 'react';
import styled, {css} from 'styled-components/native';

const Wrap = styled.View`
  flex-direction: row;
  padding-top: 10;
`;

const Image = styled.Image`
  width: 70;
  height: 70;
`;

const GiftImage = styled.Image`
  width: 40;
  height: 40;
`;

const Group = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 10;
`;

const Text = styled.Text`
  font-size: 15;
  color: #000000;
  ${props => css`
    font-weight: ${props.bold ? 'bold' : 'normal'};
  `}
`;

export default function Item({item}) {
  return (
    <Wrap>
      <Image source={{uri: item.img}} />
      {item.gift && <GiftImage source={{uri: item.gift.img}} />}
      <Group>
        <Text bold={true}>{item.name}</Text>
        {item.gift && <Text>{item.gift.name}</Text>}
        <Text>{item.price}</Text>
      </Group>
    </Wrap>
  );
}
