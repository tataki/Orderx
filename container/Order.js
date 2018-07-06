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
import { getOrder } from '../services/api';
import { State } from 'react-native-gesture-handler';
class Order extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '订单',
    headerLeft: <Text />
  });
  constructor(props) {
    super(props);
    this.state = {
      order: []
    };
  }

  // componentWillMount() {
  //   this.setState({
  //     foods: this.props.foods
  //   });
  //   console.log(this.props.foods);
  // }
  componentDidMount() {
    getOrder(this.props.table).then(data =>
      this.setState({
        order: data
      })
    );
  }

  renderItems(items) {
    let list = [];
    items.goods.map((item, i) => {
      list.push(
        <ListItem key={i} last={this.state.order.length === i + 1}>
          <Thumbnail
            square
            style={{ width: 110, height: 90 }}
            source={{ uri: item.goods.goods_front_image }}
          />
          <Body style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>{item.goods.name}</Text>
            <Text style={{ fontSize: 14, fontStyle: 'italic' }}>
              口味: 清淡
            </Text>
            <Text style={{ fontSize: 14, fontStyle: 'italic' }}>
              数量: {item.goods_num}份
            </Text>
          </Body>
          <Right>
            <Text
              style={{
                fontSize: 14,
                fontStyle: 'italic',
                width: 70,
                color: '#0ad121'
              }}
            >
              正在上菜
            </Text>
          </Right>
        </ListItem>
      );
    });
    return list;
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#fdfdfd' }}>
        {this.state.order.length <= 0 ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Icon
              name="ios-cart"
              size={38}
              style={{ fontSize: 38, color: '#95a5a6', marginBottom: 7 }}
            />
            <Text style={{ color: '#95a5a6' }}>订单列表为空</Text>
          </View>
        ) : (
          <Content style={{ paddingRight: 10 }}>
            <Text style={{ alignSelf: 'center', fontSize: 20 }}>
              -------- {this.props.table_num}号桌 {this.props.people}
              人用餐 --------
            </Text>
            <List
              dataArray={this.state.order}
              renderRow={item => this.renderItems(item)}
            />
            <Grid style={{ marginTop: 20, marginBottom: 10 }}>
              <Col style={{ paddingLeft: 10, paddingRight: 5 }}>
                <Button
                  onPress={() => this.props.navigation.navigate('Category')}
                  // style={{ backgroundColor: Colors.navbarBackgroundColor }}
                  block
                  iconLeft
                >
                  <Text style={{ color: '#fdfdfd' }}> 加菜</Text>
                </Button>
              </Col>
              <Col style={{ paddingLeft: 5, paddingRight: 10 }}>
                <Button
                  onPress={() => this.props.navigation.navigate('Home')}
                  style={{
                    borderWidth: 1
                    // borderColor: Colors.navbarBackgroundColor
                  }}
                  block
                  iconRight
                  transparent
                >
                  <Text>下桌</Text>
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
    // order: state.order,
    table: state.table.id,
    table_num: state.table.number,
    people: state.table.people
  };
};
const mapDispatchToProps = dispatch => ({
  get_order: table => {
    dispatch(getOrder(table));
  }
});
export default connect(
  mapStateToProps,
  null
)(Order);
