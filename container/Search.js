import React from 'react';
import { Text, View } from 'react-native';
import {
  Header,
  Icon,
  Container,
  Item,
  Input,
  Button,
  Content
} from 'native-base';
import Iconx from 'react-native-vector-icons/FontAwesome';
export default class Search extends React.Component {
  static navigationOptions = ({ navigator }) => ({
    title: '搜索',
    headerRight: (
      <View style={{ marginRight: 20, flexDirection: 'row' }}>
        <Iconx
          style={{ marginLeft: 10 }}
          name="shopping-cart"
          size={30}
          color="#F5DEB3"
          onPress={() => {
            navigation.navigate('Cart');
          }}
        />
        <Iconx
          style={{ marginLeft: 10 }}
          name="wpforms"
          size={30}
          color="#F5DEB3"
          onPress={() => {
            navigation.navigate('Order');
          }}
        />
      </View>
    )
  });
  render() {
    return (
      <Container>
        <View style={{}}>
          <Item style={{ width: 200 }}>
            <Icon name="ios-search" />
            <Input placeholder="请输入关键字" />
          </Item>
        </View>
        <Content>
          <Text>Search</Text>
        </Content>
      </Container>
    );
  }
}
