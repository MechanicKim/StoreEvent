import React from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  flex: 1;
  padding-vertical: 15;
  background-color: #fafafa;
`;

const Text = styled.Text`
  font-size: 15;
  text-align: center;
`;

export default function More({more}) {
  return (
    <Button onPress={more}>
      <Text>더보기</Text>
    </Button>
  );
}
