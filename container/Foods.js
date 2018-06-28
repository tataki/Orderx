import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { getFoods } from '../services/FoodsService';
export default class Foods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: 0,
      foods: []
    };
  }

  componentDidMount() {
    getFoods(this.props.navigation.state.params.category_id).then(data => {
      this.setState({
        foods: data.category_goods
      });
    });
  }
  render() {
    console.log(this.state.foods);
    return (
      <View>
        <FlatList
          data={this.state.foods}
          renderItem={({ item }) => {
            return <Text>{item.name}</Text>;
          }}
          keyExtractor={(itme, index) => index.toString()}
        />
      </View>
    );
  }
}
