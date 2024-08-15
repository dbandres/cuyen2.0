import { Folleto } from "../intoScreen/Folleto";
import Landing from "./Landing";


const { createStackNavigator } = require("@react-navigation/stack");
const Stack = createStackNavigator()

export function RouteLanding(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="landing" component={Landing} options={{ headerShown: false }}/>
      <Stack.Screen name="folleto-screen" component={Folleto} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}