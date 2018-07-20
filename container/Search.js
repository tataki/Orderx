import React from 'react';
import { View } from 'react-native';
import {
  Header,
  Icon,
  Container,
  Item,
  Input,
  Button,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Thumbnail,
  Text
} from 'native-base';
import Iconx from 'react-native-vector-icons/FontAwesome';
import { searchFood } from '../services/api';
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: []
    };
  }
  static navigationOptions = ({ navigation }) => ({
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
  changeT(name) {
    searchFood(name).then(data => {
      this.setState({ food: data });
    });
  }
  render() {
    return (
      <Container>
        <View style={{}}>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="请输入关键字"
              onChangeText={name => this.changeT(name)}
            />
          </Item>
        </View>
        <Content>
          <List
            style={{ marginTop: 10 }}
            dataArray={this.state.food}
            renderRow={item => {
              return (
                <ListItem
                  avatar
                  style={{ marginTop: 10 }}
                  onPress={() => {
                    this.props.navigation.navigate('FoodDetail', {
                      food: item
                    });
                  }}
                >
                  <Left>
                    <Thumbnail
                      square
                      source={{ uri: item.goods_front_image }}
                    />
                  </Left>
                  <Body>
                    <Text>{item.name}</Text>
                    <Text>{item.goods_brief}</Text>
                  </Body>
                  <Right>
                    <Text note>{item.shop_price} 元</Text>
                  </Right>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
