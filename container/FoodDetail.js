import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { getFood } from '../services/api';
import { connect } from 'react-redux';

import {
  Content,
  Text,
  Grid,
  Col,
  Picker,
  Item,
  Icon,
  Button,
  Header,
  Left,
  Body,
  Title,
  Right
} from 'native-base';
import HTMLView from 'react-native-htmlview';
import { addFood, postAddFood } from '../action/food';
import Iconx from 'react-native-vector-icons/FontAwesome';

class FoodDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.food.name,
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

  constructor(props) {
    super(props);
    this.state = {
      food: this.props.navigation.state.params.food,
      food_num: 0,
      teats: 0
    };
  }
  componentWillMount() {
    let local_food_id = this.state.food.id;
    let foods = this.props.foods;
    console.log('store中的食物');
    console.log(foods);
    for (var i = 0; i < foods.length; i++) {
      if (foods[i].food.id === local_food_id) {
        this.setState({
          food_num: foods[i].food_num
        });
        break;
      }
    }
  }
  onValueChange(value) {
    this.setState({
      teats: value
    });
  }
  renderTaste() {
    let taste = [];
    taste.push(<Item key={0} label={'清淡'} value={0} />);
    taste.push(<Item key={1} label={'微辣'} value={1} />);
    taste.push(<Item key={2} label={'特辣'} value={2} />);
    return taste;
  }

  componentDidMount() {
    //暂时没有好的方案，当前使用上级路由传入title值
    // getFood(this.props.navigation.state.params.food_id).then(data => {
    //   this.setState({
    //     foods: data
    //   });
    // });
  }
  render() {
    return (
      <Content>
        <View>
          <Image
            source={{ uri: this.state.food.goods_front_image }}
            style={{
              height: 250,
              width: Dimensions.get('window').width,
              resizeMode: 'cover'
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: '#fdfdfd',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 12,
            paddingRight: 12,
            alignItems: 'center'
          }}
        >
          <Grid>
            <Col size={3}>
              <Text style={{ fontSize: 18 }}>售价</Text>
            </Col>
            <Col>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {this.state.food.shop_price}元
              </Text>
            </Col>
          </Grid>
          <Grid style={{ marginTop: 15 }}>
            <Col>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>口味:</Text>
              </View>
            </Col>
            <Col size={3}>
              <Picker
                renderHeader={backAction => (
                  <Header style={{ backgroundColor: '#f44242' }}>
                    <Left>
                      <Button transparent onPress={backAction}>
                        <Icon name="arrow-back" style={{ color: '#fff' }} />
                      </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                      <Title style={{ color: '#fff' }}>选择您的口味</Title>
                    </Body>
                    <Right />
                  </Header>
                )}
                iosHeader="选择您的口味"
                mode="dropdown"
                placeholder="选择口味"
                note={true}
                selectedValue={this.state.teats}
                onValueChange={val => {
                  this.setState({ teats: val });
                }}
              >
                {this.renderTaste()}
              </Picker>
            </Col>
          </Grid>
          <Grid>
            <Col>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>数量:</Text>
              </View>
            </Col>
            <Col size={3}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Button
                  icon
                  light
                  onPress={() => {
                    this.setState({
                      food_num:
                        this.state.food_num > 1 ? this.state.food_num - 1 : 0
                    });
                  }}
                >
                  <Icon name="ios-remove-outline" />
                </Button>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 30,
                    paddingRight: 30
                  }}
                >
                  <Text style={{ fontSize: 18 }}>{this.state.food_num}</Text>
                </View>
                <Button
                  icon
                  light
                  onPress={() => {
                    this.setState({
                      food_num: this.state.food_num + 1
                    });
                  }}
                >
                  <Icon name="ios-add" />
                </Button>
              </View>
            </Col>
          </Grid>
          <Grid style={{ marginTop: 15 }}>
            <Col size={3}>
              <Button
                block
                onPress={() => {
                  if (this.state.food_num > 0) {
                    this.props.add_Food(
                      this.state.food,
                      this.state.food_num,
                      this.props.table_id
                    );
                    alert('添加成功~');
                  } else {
                    alert('数量不正确！');
                  }
                }}
              >
                <Text style={{ color: '#fdfdfd', marginLeft: 5 }}>
                  添加进我的菜单
                </Text>
              </Button>
            </Col>
          </Grid>
        </View>
        <View
          style={{
            marginTop: 15,
            padding: 10,
            borderWidth: 1,
            borderRadius: 3,
            borderColor: 'rgba(149, 165, 166, 0.3)'
          }}
        >
          <Text style={{ marginBottom: 5 }}>描述</Text>
          <View
            style={{
              width: 50,
              height: 1,
              backgroundColor: 'rgba(44, 62, 80, 0.5)',
              marginLeft: 7,
              marginBottom: 10
            }}
          />
          <HTMLView value={this.state.food.goods_desc} />
        </View>
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    foods: state.foods,
    table_id: state.table.id
  };
};

const mapDispatchToProps = dispatch => ({
  add_Food: (food, num, table_id) => {
    dispatch(postAddFood(food, num, table_id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodDetail);
