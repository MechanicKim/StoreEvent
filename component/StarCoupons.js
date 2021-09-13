import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const Scroll = styled.ScrollView`
  flex: 1;
`;

const Wrap = styled.TouchableOpacity``;

const Coupon = styled.Image`
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').width};
`;

const images = [
  require('../image/coupon1.jpg'),
  require('../image/coupon2.jpg'),
  require('../image/coupon3.jpg'),
  require('../image/coupon4.jpg'),
  require('../image/coupon5.jpg'),
  require('../image/coupon6.jpg'),
];

export default function StarCoupons({toggle}) {
  return (
    <Scroll>
      {images.map((coupon, index) => {
        return (
          <Wrap key={index} activeOpacity={0.9} onPress={() => toggle(coupon)}>
            <Coupon source={coupon} accessibilityLabel={`Coupon${index}`} />
          </Wrap>
        );
      })}
    </Scroll>
  );
}
