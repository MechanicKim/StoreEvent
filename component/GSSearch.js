import React, {useState} from 'react';
import styled from 'styled-components/native';

const Wrap = styled.View`
  flex-direction: row;
  background-color: #f5f5f5;
  padding-horizontal: 10;
  padding-bottom: 10;
  background-color: #eeeeee;
`;

const Input = styled.TextInput`
  flex: 1;
  padding-horizontal: 12;
  font-size: 17;
  background-color: #fafafa;
  border-radius: 5;
`;

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding-horizontal: 20;
  background-color: #3c78d8;
`;

const Text = styled.Text`
  font-weight: bold
  font-size: 15;
  color: #ffffff;
`;

export default function GSSearch({search}) {
  const [keyword, setKeyword] = useState('');

  return (
    <Wrap>
      <Input
        value={keyword}
        onChangeText={text => setKeyword(text)}
        placeholder="상품명으로 검색"
      />
      <Button onPress={() => search(keyword)}>
        <Text>찾기</Text>
      </Button>
    </Wrap>
  );
}
