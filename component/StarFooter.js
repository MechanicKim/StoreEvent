import React from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 15px 0;
  background-color: #ffe812;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export default function StarFooter(props) {
  return (
    <Button activeOpacity={0.9} onPress={props.openKakao}>
      <Text>카카오톡 채널</Text>
    </Button>
  );
}
