import React, {Component} from 'react';
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

const couponMonth = 5;
const month = new Date().getMonth() + 1;

export default class Star extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popOn: false,
      coupon: null,
    };
  }

  render() {
    const {popOn, coupon} = this.state;

    return (
      <Page>
        <StatusBar barStyle="default" />
        <BackButton />
        {couponMonth === month && <StarCoupons toggle={this.toggle} />}
        {couponMonth !== month && <StarEmpty month={month} />}
        <StarFooter openKakao={this.openKakao} />
        {popOn && <StarCoupon coupon={coupon} toggle={this.toggle} />}
      </Page>
    );
  }

  toggle = (popOn, coupon) => {
    this.setState({
      popOn,
      coupon,
    });
  };

  openKakao = () => {
    Linking.openURL('https://pf.kakao.com/_edxbxfT/friend');
  };
}
