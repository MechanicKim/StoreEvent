import React from 'react';
import styled from 'styled-components/native';
import {css} from 'styled-components';

const Text = css`
  font-weight: bold;
  color: #212121;
  margin-vertical: 7;
`;

const View = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  ${Text}
  font-size: 40;
`;

const Sub = styled.Text`
  ${Text}
  font-size: 25;
`;

export default function MainView() {
  return (
    <View>
      <Title>이달의 편의점</Title>
      <Sub>{new Date().getMonth() + 1}월 행사상품</Sub>
    </View>
  );
}
