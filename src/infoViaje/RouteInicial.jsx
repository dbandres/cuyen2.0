import { InfoProvider } from "./InfoContext";
import { RouteInfoViaje, Stack1Navigator } from "./RouteInfoViaje";
import { EditarPasajero } from "./editarPasajero/EditarPasajero";



const { createStackNavigator } = require("@react-navigation/stack");

const Stack = createStackNavigator()

export const RouteInicial = () => {
	return (
		<InfoProvider>
			<Stack.Navigator
			>
				<Stack.Screen name="routeInfoViaje" component={RouteInfoViaje} options={{ headerShown: false }} />
				<Stack.Screen name="carga-pasajero" component={Stack1Navigator} options={{ headerShown: false }} />
				<Stack.Screen name="EditarPasajero" component={EditarPasajero} options={{ headerShown: false }} />
			</Stack.Navigator>
		</InfoProvider>
	)
}