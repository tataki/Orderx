import { createStackNavigator,createBottomTabNavigator } from 'react-navigation';
import Category from '../container/Category';
import CheckOut from '../container/CheckOut';
import Foods from '../container/Foods';
import Home from '../container/Home';

// export default createBottomTabNavigator({
//   Home,
//   Category,
//   CheckOut,
//   Foods,
// })

export default createStackNavigator({
  Home:{
    screen:Home,
    navigationOptions:()=>({
      title:'开始点餐'
    })
  },
  Category:{
    screen:Category
  },
  CheckOut:{
    screen:CheckOut
  },
  Foods:{
    screen:Foods
  }
})

