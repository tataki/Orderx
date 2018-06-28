import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Grid, Content, Col } from 'native-base';
import { getFoods } from '../services/FoodsService';
import FoodItem from '../components/FoodItem';
export default class Foods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: 0,
      foods: []
    };
  }
  renderFoods() {
    let items = [];
    let stateItems = this.state.foods;
    console.log('渲染');
    console.log(stateItems);
    for (var i = 0; i < stateItems.length; i += 2) {
      if (stateItems[i + 1]) {
        items.push(
          <Grid key={i}>
            <FoodItem data={stateItems[i]} />
            <FoodItem data={stateItems[i + 1]} isRight />
          </Grid>
        );
      } else {
        items.push(
          <Grid key={i}>
            <FoodItem data={stateItems[i]} />
            <Col key={i + 1} />
          </Grid>
        );
      }
    }
    return items;
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
    return <Content>{this.renderFoods()}</Content>;
  }
}
