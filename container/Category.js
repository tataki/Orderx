import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Content, List } from 'native-base';
import { getCategory } from '../services/CategoryService';
import CategoryItem from '../components/CategoryItem/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { getCartFood } from '../action/category';
class Category extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '菜品目录',
    headerRight: (
      <View style={{ marginRight: 20 }}>
        <Icon
          name="shopping-cart"
          size={30}
          color="#F5DEB3"
          onPress={() => {
            navigation.navigate('Cart');
          }}
        />
      </View>
    )
  });

  componentDidMount() {
    console.log('状态1');
  }
  componentDidUpdate() {
    console.log('状态2');
  }
  componentDidCatch() {
    console.log('状态3');
  }
  componentWillReceiveProps() {
    console.log('状态4');
  }
  componentWillUnmount() {
    console.log('状态5');
  }
  componentWillUpdate() {
    console.log('状态6');
  }
  componentWillMount() {
    console.log('状态7');
  }
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    getCategory().then(data => {
      this.setState({
        data: data
      });
    });
  }
  render() {
    return (
      <Content>
        <List>
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item, index) => {
              return (
                <CategoryItem
                  item={item}
                  index={index}
                  navigation={this.props.navigation}
                />
              );
            }}
          />
        </List>
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
  get_cart_food: table_id => {
    dispatch(getCartFood(table_id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
