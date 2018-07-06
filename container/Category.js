import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Content, List, Container, Button, Icon } from 'native-base';
import { getCategory } from '../services/api';
import CategoryItem from '../components/CategoryItem/';
import { connect } from 'react-redux';
import { getCartFood } from '../action/category';
import { empty_Cart } from '../action/food';
import Fab from '../components/fab';
class Category extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '菜品目录',
    headerLeft: <View />
  });

  componentWillMount() {
    this.props.emptycart();
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
      <Container>
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
        <Fab
          action={this.props.active}
          navigation={this.props.navigation}
          handstate={() => this.setState({ active: !this.state.active })}
        />
      </Container>
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
  },
  emptycart: () => {
    dispatch(empty_Cart());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
