import React from 'react';
import styled, { css } from 'styled-components/native';

import Item from './Item';
import More from './More';

const Scroll = styled.ScrollView`
  flex: 1;
`;

const Line = styled.View`
  flex-direction: row;
  padding-top: 10;
`;

const Text = styled.Text`
  ${props => css`
    font-weight: ${props.bold ? 'bold' : 'normal'}
    font-size: ${props.size || 15};
    color: ${props.color || '#000000'};
  `}
`;

export default function GSItems(props) {
  return (
    <Scroll>
    {props.items.map((item, index) => (
      <Item key={index} Text={Text} item={item} />
    ))}
      <More more={props.more} />
    </Scroll>
  );
}
