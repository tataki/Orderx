import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Content, List } from 'native-base';
import { getCategory } from '../services/CategoryService';
import CategoryItem from '../components/CategoryItem/';
export default class Category extends React.Component {
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
      console.log(this.state.data);
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

Category.navigationOptions = {
  title: '菜品目录'
};
