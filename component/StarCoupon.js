import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const Pop = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Coupon = styled.Image`
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').width};
`;

export default function StarCoupon(props) {
  return (
    <Pop activeOpacity={0.9} onPress={() => props.toggle(false, null)}>
      <Coupon source={props.coupon} />
    </Pop>
  );
}
