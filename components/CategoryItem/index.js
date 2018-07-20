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
// export default class CategoryItem extends React.Component {
//   render() {
//     const { item, index } = this.props.item;
//     return (
//       <TouchableHighlight
//         onPress={() => {
//           this.props.navigation.navigate('Foods', { category_id: item.id });
//         }}
//       >
//         <View style={styles.container}>
//           <Image style={styles.img} source={{ uri: item.logo }} />
//           <Text style={styles.text}>{item.name}</Text>
//         </View>
//       </TouchableHighlight>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   text: {
//     color: '#fff',
//     fontSize: 35,
//     fontWeight: 'bold',
//     position: 'absolute',
//     textShadowOffset: { width: 5, height: 5 },
//     textShadowRadius: 3,
//     textShadowColor: '#666',
//     padding: 20
//   },
//   img: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: 250
//   },
//   container: {
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
export default class CategoryItem extends React.Component {
  render() {
    const { item, index } = this.props.item;
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Foods', { category_id: item.id });
          }}
          activeOpacity={0.9}
        >
          <View>
            <Image style={styles.image} source={{ uri: item.logo }} />
            <View style={styles.overlay} />
            <View style={styles.border} />
            <View style={styles.text}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subtitle}>Shop Now</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    width: Dimensions.get('window').width,
    height: 200,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    color: '#fdfdfd',
    fontSize: 32
  },
  subtitle: {
    textAlign: 'center',
    color: '#fdfdfd',
    fontSize: 16,
    fontWeight: '100',
    fontStyle: 'italic'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 42, 54, 0.4)'
  },
  border: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(253, 253, 253, 0.2)'
  },
  image: {
    height: 200,
    width: null,
    flex: 1
  }
});
