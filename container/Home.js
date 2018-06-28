import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Content, Text, Input, Button } from 'native-base';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import { postTableNumber } from '../action/home';
// import { postTable } from '../services/HomeService';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table_num: 0
    };
  }

  changeTextHandler = data => {
    console.log(data);
    this.setState({
      table_num: data
    });
  };

  submitButtonHandler = () => {
    this.props.setTable(this.state.table_num);
    this.props.navigation.navigate('Category');
  };

  render() {
    return (
      <Content>
        <View>
          <TouchableOpacity>
            <View
              style={styles.container}
              button={true}
              onPress={() => {
                alert('onpress');
              }}
            >
              <Image
                style={styles.img}
                source={{
                  uri:
                    'http://www.jingyanbus.com/uploads/allimg/170503/4213_170503111357_1.jpg'
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
          postion="center"
          ref="inputModal"
          style={{ height: 180, width: 300, borderRadius: 10 }}
        >
          <Text style={{ fontSize: 30, padding: 20, alignSelf: 'center' }}>
            输入桌号
          </Text>
          <TextInput
            placeholder="当前桌号"
            style={{
              height: 40,
              borderColor: '#ddd',
              borderWidth: 1,
              margin: 5,
              width: 150,
              alignSelf: 'center'
            }}
            onChangeText={this.changeTextHandler}
            keyboardType="number-pad"
          />
          <Button
            primary
            style={{ alignSelf: 'center', margin: 5 }}
            onPress={this.submitButtonHandler}
          >
            <Text>确定</Text>
          </Button>
        </Modal>
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.table.id,
    number: state.table.number
  };
};

const mapDispatchToProps = dispatch => ({
  setTable: val => {
    dispatch(postTableNumber(val));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 20,
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
