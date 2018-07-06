import React from 'react';
import { Grid, Content, Col, Container } from 'native-base';
import { getFoods } from '../services/api';
import FoodItem from '../components/FoodItem';
import Fab from '../components/fab';
export default class Foods extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '菜品'
  });
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
            <FoodItem data={stateItems[i]} navigation={this.props.navigation} />
            <FoodItem
              data={stateItems[i + 1]}
              isRight
              navigation={this.props.navigation}
            />
          </Grid>
        );
      } else {
        items.push(
          <Grid key={i}>
            <FoodItem data={stateItems[i]} navigation={this.props.navigation} />
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
    return (
      <Container>
        <Content>{this.renderFoods()}</Content>
        <Fab
          action={this.props.active}
          navigation={this.props.navigation}
          handstate={() => this.setState({ active: !this.state.active })}
        />
      </Container>
    );
  }
}
