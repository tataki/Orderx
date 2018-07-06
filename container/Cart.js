import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  Container,
  Content,
  View,
  Header,
  Icon,
  Button,
  Left,
  Right,
  Body,
  Title,
  List,
  ListItem,
  Thumbnail,
  Grid,
  Col,
  Colors
} from 'native-base';
import { connect } from 'react-redux';
import { deleteFood, emptyCart } from '../action/food';
import Iconx from 'react-native-vector-icons/FontAwesome';
class Cart extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '我的菜单',
    headerRight: (
      <View style={{ marginRight: 20, flexDirection: 'row' }}>
        <Iconx
          name="search"
          size={30}
          color="#F5DEB3"
          onPress={() => {
            navigation.navigate('Search');
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
  constructor(props) {
    super(props);
    this.state = {
      foods: []
    };
  }

  componentWillMount() {
    console.log('状态7');
    this.setState({
      foods: this.props.foods
    });
    console.log(this.props.foods);
  }
  itemClicked(item) {
    this.props.navigation.navigate('FoodDetail', {
      food: item.food
    });
  }
  checkout() {
    this.props.navigation.navigate('CheckOut');
  }
  removeItemPressed(item) {
    this.props.delete_Food(item.food, this.props.table);
  }
  renderItems() {
    let items = [];
    this.state.foods.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          last={this.state.foods.length === i + 1}
          onPress={() => this.itemClicked(item)}
        >
          <Thumbnail
            square
            style={{ width: 110, height: 90 }}
            source={{ uri: item.food.goods_front_image }}
          />
          <Body style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>{item.food.name}</Text>
            <Text
              style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}
            >
              {item.food.shop_price}元
            </Text>
            <Text style={{ fontSize: 14, fontStyle: 'italic' }}>
              口味: 清淡
            </Text>
            <Text style={{ fontSize: 14, fontStyle: 'italic' }}>
              数量: {item.food_num}份
            </Text>
          </Body>
          <Right>
            <Button
              style={{ marginLeft: -25 }}
              transparent
              onPress={() => this.removeItemPressed(item)}
            >
              <Icon
                size={30}
                style={{ fontSize: 30, color: '#95a5a6' }}
                name="ios-remove-circle-outline"
              />
            </Button>
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#fdfdfd' }}>
        {this.state.foods.length <= 0 ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Icon
              name="ios-cart"
              size={38}
              style={{ fontSize: 38, color: '#95a5a6', marginBottom: 7 }}
            />
            <Text style={{ color: '#95a5a6' }}>菜单列表为空</Text>
            <Button
              onPress={() => this.props.navigation.goBack()}
              // style={{ backgroundColor: Colors.navbarBackgroundColor }}
              block
              style={{ width: 100, alignSelf: 'center', marginTop: 20 }}
            >
              <Text style={{ color: '#fdfdfd' }}> 返回</Text>
            </Button>
          </View>
        ) : (
          <Content style={{ paddingRight: 10 }}>
            <List>{this.renderItems()}</List>
            <Grid style={{ marginTop: 20, marginBottom: 10 }}>
              <Col style={{ paddingLeft: 10, paddingRight: 5 }}>
                <Button
                  onPress={() => this.checkout()}
                  // style={{ backgroundColor: Colors.navbarBackgroundColor }}
                  block
                  iconLeft
                >
                  <Icon name="ios-card" />
                  <Text style={{ color: '#fdfdfd' }}> 结算</Text>
                </Button>
              </Col>
              <Col style={{ paddingLeft: 5, paddingRight: 10 }}>
                <Button
                  onPress={() => {
                    this.props.empty_cart(this.props.table);
                  }}
                  style={{
                    borderWidth: 1
                    // borderColor: Colors.navbarBackgroundColor
                  }}
                  block
                  iconRight
                  transparent
                >
                  <Icon name="ios-trash-outline" />
                  <Text>清空菜单</Text>
                </Button>
              </Col>
            </Grid>
          </Content>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    foods: state.foods,
    table: state.table.id
  };
};
const mapDispatchToProps = dispatch => ({
  delete_Food: (food, table) => {
    dispatch(deleteFood(food, table));
  },
  empty_cart: table => {
    dispatch(emptyCart(table));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
