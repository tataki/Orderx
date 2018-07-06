import React from 'react';
import { Text, Image, Dimensions } from 'react-native';
import FAIcon from 'react-native-vector-icons/MaterialCommunityIcons';
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
  Colors,
  Radio,
  Input,
  Item
} from 'native-base';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
// import { postOrder } from '../action/checkout';
import { empty_Cart } from '../action/food';
import { postOrder } from '../services/api';
class CheckOut extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '结算'
  });
  renderItems() {
    let items = [];
    this.props.foods.map((item, i) => {
      items.push(
        <ListItem key={i} style={{ marginLeft: 0 }}>
          <Body style={{ paddingLeft: 20 }}>
            <Text style={{ fontSize: 28 }}>
              {item.food_num > 2 ? item.food_num + 'x ' : null}
              {item.food.name}
            </Text>
            <Text style={{ fontSize: 24, fontStyle: 'italic' }}>
              口味: 清淡
            </Text>
            {/* <Text style={{fontSize: 24 ,fontStyle: 'italic'}}>数量: {item.food_num}份</Text> */}
          </Body>
          <Right>
            <Text
              style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 20 }}
            >
              {item.food.shop_price * item.food_num}元
            </Text>
          </Right>
        </ListItem>
      );
    });
    return items;
  }
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      alipay: true,
      cash: false,
      fingerColor: 'black'
    };
  }

  goDone() {
    postOrder(this.props.table, this.state.total).then(() =>
      this.props.emptycart()
    );
    setTimeout(() => this.props.navigation.navigate('Order'), 3000);
  }

  changeFingerColor() {
    this.setState({ fingerColor: '#2296db' });
    this.goDone();
  }
  checkout() {
    if (this.state.alipay === true) {
      this.refs.payModal.open();
    } else {
      this.goDone();
    }
  }
  componentDidMount() {
    console.log('2状态2');
  }
  componentDidUpdate() {
    console.log('2状态2');
  }
  componentDidCatch() {
    console.log('2状态3');
  }
  componentWillReceiveProps() {
    console.log('2状态4');
  }
  componentWillUnmount() {
    console.log('2状态5');
  }
  componentWillUpdate() {
    console.log('2状态6');
  }

  componentWillMount() {
    console.log('2状态7');
    var total = 0;
    this.props.foods.map((item, i) => {
      total += parseFloat(item.food.shop_price) * parseInt(item.food_num);
    });
    this.setState({ total: total });
  }
  render() {
    return (
      <Container style={{ backgroundColor: '#fdfdfd' }}>
        <Content padder>
          <View>
            <Text style={{ marginTop: 25, fontSize: 28 }}>餐桌信息</Text>
            <Item style={{ marginTop: 30 }}>
              <Text style={{ fontSize: 26 }}>桌号:{this.props.table} 号</Text>
            </Item>
            <Item style={{ marginTop: 7 }}>
              <Text style={{ fontSize: 26 }}>
                用餐人数:{this.props.people} 人
              </Text>
            </Item>
          </View>
          <Text style={{ marginTop: 20, fontSize: 28 }}>你的菜单</Text>
          <View style={styles.invoice}>
            <List>{this.renderItems()}</List>
            <View style={styles.line} />
            <Grid style={{ paddingLeft: 20, paddingRight: 20, marginTop: 7 }}>
              <Col>
                <Text style={{ fontSize: 28, fontStyle: 'italic' }}>总价</Text>
              </Col>
              <Col>
                <Text
                  style={{
                    textAlign: 'right',
                    fontSize: 28,
                    fontWeight: 'bold'
                  }}
                >
                  {this.state.total + '元'}
                </Text>
              </Col>
            </Grid>
          </View>
          <View>
            <Text style={{ marginTop: 25, marginBottom: 7, fontSize: 28 }}>
              支付方式
            </Text>
            <ListItem
              style={{
                borderWidth: 2,
                borderColor: 'rgba(249, 265, 266, 0.3)',
                paddingLeft: 20,
                marginLeft: 0
              }}
              onPress={() => this.setState({ cash: false, alipay: true })}
            >
              <Left>
                <Text>支付宝支付 </Text>
                <Image source={require('../images/alipay.png')} size={20} />
              </Left>
              <Right>
                <Radio selected={this.state.alipay} />
              </Right>
            </ListItem>
            <ListItem
              style={{
                borderWidth: 2,
                borderColor: 'rgba(249, 265, 266, 0.3)',
                paddingLeft: 20,
                marginLeft: 0,
                borderTopWidth: 0
              }}
              onPress={() => {
                this.setState({ cash: true, alipay: false });
              }}
            >
              <Left>
                <Text>现金结算</Text>
              </Left>

              <Right>
                <Radio selected={this.state.cash} />
              </Right>
            </ListItem>
          </View>
          <View style={{ marginTop: 20, marginBottom: 20, paddingBottom: 7 }}>
            <Button onPress={() => this.checkout()} block iconLeft>
              <Text style={{ color: '#fdfdfd' }}>提交订单</Text>
            </Button>
          </View>
        </Content>
        <Modal
          ref="payModal"
          backdropOpacity={0.5}
          style={{
            height: 250,
            width: Dimensions.get('window').width,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          }}
          position="bottom"
        >
          <View alignItems="center" style={{ marginTop: 30 }}>
            <FAIcon
              ref="fingerprint"
              name="fingerprint"
              size={120}
              color={this.state.fingerColor}
              onPress={() => {
                this.changeFingerColor();
              }}
            />
            {this.state.fingerColor == '#2296db' ? (
              <Text>支付成功！</Text>
            ) : (
              <Text>假装指纹支付下~</Text>
            )}
          </View>
        </Modal>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    foods: state.foods,
    table: state.table.id,
    people: state.table.people
  };
};
const mapDispatchToProps = dispatch => ({
  // post_order: (table_id, order_mount) => {
  //   dispatch(postOrder(table_id, order_mount));
  // },
  emptycart: () => {
    dispatch(empty_Cart());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckOut);

const styles = {
  invoice: {
    paddingLeft: 20,
    paddingRight: 20
  },
  line: {
    width: '200%',
    height: 2,
    backgroundColor: '#bdc3c7'
  }
};
