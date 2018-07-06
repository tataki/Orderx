import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';
import { Content, Input, Button, Text } from 'native-base';
import { BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
import { postTableNumber } from '../action/home';
class BarcodeScannerExample extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '扫描二维码'
  });
  state = {
    hasCameraPermission: null,
    table_num: 0
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
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
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>请求相机权限</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>相机未被授权</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
          <Modal
            ref="inputModal"
            backdropOpacity={0}
            style={{ height: 250, width: 300, borderRadius: 10 }}
          >
            <Text style={{ fontSize: 20, alignSelf: 'center', marginTop: 20 }}>
              ------桌号: {this.state.table_num}------
            </Text>
            <View style={{ alignItems: 'center' }}>
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
                underlineColorAndroid="transparent"
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
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    if (data !== this.state.table_num) {
      this.setState({ table_num: data });
      this.refs.inputModal.open();
    }
  };
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
)(BarcodeScannerExample);
