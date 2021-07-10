import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Linking, StatusBar} from 'react-native';

import {BackButton} from 'react-router-native';

import StarCoupons from '../component/StarCoupons';
import StarEmpty from '../component/StarEmpty';
import StarFooter from '../component/StarFooter';
import StarCoupon from '../component/StarCoupon';

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const couponMonth = 6;
const month = new Date().getMonth() + 1;

export default function Star() {
  const [popOn, setPopOn] = useState(false);
  const [coupon, setCoupon] = useState(null);

  function toggle(selectedCoupon) {
    setCoupon(selectedCoupon);
    setPopOn(!popOn);
  }

  function openKakao() {
    Linking.openURL('https://pf.kakao.com/_edxbxfT/friend');
  }

  return (
    <Page>
      <StatusBar barStyle="default" />
      <BackButton />
      {couponMonth === month && <StarCoupons toggle={toggle} />}
      {couponMonth !== month && <StarEmpty month={month} />}
      <StarFooter openKakao={openKakao} />
      {popOn && <StarCoupon coupon={coupon} toggle={toggle} />}
    </Page>
  );
}
