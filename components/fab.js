import React from 'react';
import { Fab, Icon, Button } from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';
export default class fabx extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fab
        active={this.props.active}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: '#5067FF' }}
        position="bottomRight"
        onPress={() => this.props.handstate()}
      >
        <Icon name="share" />
        <Button
          style={{ backgroundColor: '#34A34F' }}
          onPress={() => {
            this.props.navigation.navigate('Order');
          }}
        >
          <FAIcon name="wpforms" color="#fff" size={18} />
        </Button>
        <Button
          style={{ backgroundColor: '#3B5998' }}
          onPress={() => {
            this.props.navigation.navigate('Cart');
          }}
        >
          <Icon name="cart" />
        </Button>
        <Button
          style={{ backgroundColor: '#DD5144' }}
          onPress={() => {
            this.props.navigation.navigate('Search');
          }}
        >
          <Icon name="search" />
        </Button>
      </Fab>
    );
  }
}
