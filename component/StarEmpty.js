import React from 'react';
import styled from 'styled-components/native';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 18px;
`;

export default function StarEmpty(props) {
  return (
    <View>
      <Text>{props.month}월 할인쿠폰을 기다려주세요.</Text>
    </View>
  );
}
