import { Folleto } from "./Folleto";
import { Intro } from "./Intro";

const { createStackNavigator } = require("@react-navigation/stack");
const Stack = createStackNavigator()

export function RouteInto(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="intro-screen" component={Intro} options={{ headerShown: false }}/>
      <Stack.Screen name="folleto-screen" component={Folleto} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}