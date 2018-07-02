import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Content, Input, Button, Text } from 'native-base';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import { postTableNumber } from '../action/home';
// import { postTable } from '../services/HomeService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCartFood } from '../action/category';

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '开始点餐'
  });
  constructor(props) {
    super(props);
    this.state = {
      table_num: 0,
      people_num: 0
    };
  }

  componentDidMount() {
    console.log('1状态1');
  }
  componentDidUpdate() {
    console.log('1状态2');
    this.props.get_cart_food(this.props.table_id);
  }
  componentDidCatch() {
    console.log('1状态3');
  }
  componentWillReceiveProps() {
    console.log('1状态4');
  }
  componentWillUnmount() {
    console.log('1状态5');
  }
  componentWillUpdate() {
    console.log('1状态6');
  }
  componentWillMount() {
    console.log('1状态7');
  }

  changeTableTextHandler = data => {
    console.log(data);
    this.setState({
      table_num: data
    });
  };
  changePeopleTextHandler = data => {
    this.setState({
      people_num: data
    });
  };

  submitButtonHandler = () => {
    this.props.setTable(this.state.table_num, this.state.people_num);
    this.props.navigation.navigate('Category');
    this.refs.inputModal.close();
  };

  render() {
    return (
      <Content>
        <View>
          <TouchableOpacity>
            <View style={styles.container}>
              <Image
                style={styles.img}
                source={{
                  uri: 'http://upload.qianlong.com/2017/0705/1499216258932.jpg'
                }}
              />
              <Text style={styles.text}>扫描二维码</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.refs.inputModal.open();
            }}
          >
            <View style={styles.container}>
              <Image
                style={styles.img}
                source={{
                  uri:
                    'http://img.zcool.cn/community/0145d7573e6e436ac7253f9adb4cbd.jpg@900w_1l_2o_100sh.jpg'
                }}
              />
              <Text style={styles.text}>输入桌号</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          ref="inputModal"
          backdropOpacity={0}
          style={{ height: 250, width: 300, borderRadius: 10 }}
        >
          <Text style={{ fontSize: 20, alignSelf: 'center', marginTop: 20 }}>
            ------请输入------
          </Text>
          <View style={{ alignItems: 'center' }}>
            <TextInput
              placeholder="当前桌号"
              textAlign="center"
              style={{
                height: 40,
                borderColor: '#ddd',
                borderWidth: 1,
                margin: 5,
                width: 150,
                borderRadius: 15
              }}
              onChangeText={this.changeTableTextHandler}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="用餐人数"
              textAlign="center"
              style={{
                height: 40,
                borderColor: '#ddd',
                borderWidth: 1,
                margin: 5,
                width: 100,
                borderRadius: 15
              }}
              onChangeText={this.changePeopleTextHandler}
              keyboardType="numeric"
            />
          </View>

          <Button
            primary
            style={{ alignSelf: 'center', margin: 5 }}
            onPress={this.submitButtonHandler}
          >
            <Text>提交</Text>
          </Button>
        </Modal>
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    table_id: state.table.id
  };
};

const mapDispatchToProps = dispatch => ({
  setTable: (table, people) => {
    dispatch(postTableNumber(table, people));
  },
  get_cart_food: table_id => {
    dispatch(getCartFood(table_id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    position: 'absolute',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 3,
    textShadowColor: '#666',
    padding: 20
  },
  img: {
    flex: 1,
    width: 400,
    height: 250
  },
  container: {
    backgroundColor: 'white',
    margin: 10,
    marginTop: 30,
    shadowColor: 'gray',
    shadowRadius: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
});
