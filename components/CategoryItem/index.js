import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import { ListItem, Text } from 'native-base';
export default class CategoryItem extends React.Component {
  render() {
    const { item, index } = this.props.item;
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigation.navigate('Foods', { category_id: item.id });
        }}
      >
        <View style={styles.container}>
          <Image style={styles.img} source={{ uri: item.logo }} />
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    position: 'absolute',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 3,
    textShadowColor: '#666',
    padding: 20
  },
  img: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: 250
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
