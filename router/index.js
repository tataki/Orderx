import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import { Button, Text } from 'react-native';
import Category from '../container/Category';
import CheckOut from '../container/CheckOut';
import Foods from '../container/Foods';
import Home from '../container/Home';
import FoodDetail from '../container/FoodDetail';
import Cart from '../container/Cart';
import Order from '../container/Order';
import Search from '../container/Search';
import Qr from '../container/Qr';
import Icon from 'react-native-vector-icons/FontAwesome';

// export default createBottomTabNavigator({
//   Home,
//   Category,
//   CheckOut,
//   Foods,
// })

export default createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Category: {
      screen: Category
    },
    CheckOut: {
      screen: CheckOut
    },
    Foods: {
      screen: Foods
    },
    FoodDetail: {
      screen: FoodDetail
    },
    Cart: {
      screen: Cart
    },
    Order: {
      screen: Order
    },
    Search: {
      screen: Search
    },
    Qr: {
      screen: Qr
    }
  },
  {
    initialRouteName: 'Home',
    /* 这里定义的头部样式对栈中的每个屏幕生效除非那个屏幕类覆盖了改定义 */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center'
      }
    }
  }
);
