import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { StyleSheet, View, Text, Image, Linking, Platform, Alert } from "react-native"
import { CargaPasajero } from '../screens/tabScreens/CargaPasajero';
import { Ubicacion } from '../screens/tabScreens/Ubicacion';
import { MenuBottonItem } from './MenuBottonItem';
import { data } from './dataDrawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RouteMuro } from '../screens/tabScreens/muro/RouteMuro';
import { UserContext } from '../context/UserContext';
import { useCallback, useContext, useState } from "react";
import { Folleto } from '../screens/auth/intoScreen/Folleto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteLanding } from '../landing/RouteLanding';
import { RouteInfoViaje } from '../infoViaje/RouteInfoViaje';
import { RouteInicial } from '../infoViaje/RouteInicial';
import { AuthContext } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { GestionContrato } from '../gestionarContrato/GestionContrato';
import { useDispatch, useSelector } from 'react-redux';
import { putDeleteUser, setStatus, setError, setLoading } from '../slices/deletedUserSlice';


const CustomDrawerContent = ({ navigation }) => {

	const { userdata, setUserData } = useContext(UserContext)
	const [userD, setStoredData] = useState(null);
	const { setAuthenticate } = useContext(AuthContext)
	const numeroContrato = useSelector((state) => state.contratoActual.numero);
	const dispatch = useDispatch()

	const singOutSession = () => {
		AsyncStorage.removeItem("userStorage")
		setUserData({
			apellido: "",
			contrato: "",
			email: "",
			jwt: "",
			nombre: "",
			rol: "",
			telefono: "",
			usuario: ""
		})
		setAuthenticate(false)
	}

	const abrirLink = (linkUrl) => {
		const url = linkUrl;
		Linking.openURL(url)
			.catch((err) => console.error('Error al abrir el enlace:', err));
	};

	const loadData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('userStorage');
			if (jsonValue !== null) {
				const user = JSON.parse(jsonValue);
				setStoredData(user);
			} else {
				Alert.alert('Vuelva a ingresar mas tarde.');
			}
		} catch (error) {
			console.error('Failed to load data from AsyncStorage', error);
			Alert.alert('Failed to load data');
		}
	};

	useFocusEffect(useCallback(() => {
		loadData()

	}, []))

	const deleteUser = () => {
    Alert.alert(
      "Eliminar cuenta",
      "¿Está seguro que desea eliminar su cuenta?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel"
        },
        { 
          text: "Eliminar", 
            onPress: () => {
							try {
								dispatch(putDeleteUser({id: userD.usuario.id}))
								singOutSession()
							} catch (error) {
								dispatch(setError(error.message))
							}
						}
          ,
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  }

	console.log('contrato actual! ', userD);

	return (
		<DrawerContentScrollView style={{ backgroundColor: "#3462BF", flex: 1 }}>
			<View style={styles.drawerHeader}>
				{/* Aquí puedes agregar tu imagen */}
				<Image
					source={require("../assets/logoCuyen.png")} // Ruta a tu imagen
					style={styles.drawerImage}
				/>
			</View>
			<View style={{ height: 70, alignItems: "center", position: "absolute", top: Platform.OS === 'android' ? 185 : 245, left: "20%" }}>
				<View style={{ width: "80%", height: 30, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
					<TouchableOpacity onPress={() => { abrirLink("https://www.instagram.com/cuyenturismo/") }}>
						<Image
							source={require("../assets/insta.png")}
							style={{ width: 32, height: 32 }}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => { abrirLink("https://www.facebook.com/cuyenturismo/?locale=es_LA") }}>
						<Image
							source={require("../assets/Facebook.png")}
							style={{ width: 32, height: 32 }}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Image
							source={require("../assets/Email.png")}
							style={{ width: 32, height: 32 }}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ alignItems: "center" }}>
				<View style={{ height: 220, width: "80%", marginTop: "15%" }}>
					<View style={{ height: "30%", marginBottom: "10%" }}>
						<View style={{ height: "70%", display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
							<View style={{ width: "50%" }}>
								<Text style={{ fontWeight: "700", color: "white" }}>{userD?.usuario?.apellido.toUpperCase()} {userD?.usuario?.nombre}</Text>
							</View>
							{/* <TouchableOpacity>
								<Image
									source={require("../assets/edit.png")}
									style={{ width: 40, height: 40 }}
								/>
							</TouchableOpacity> */}
						</View>
						<View style={{ borderWidth: 1, borderColor: "#93E396", height: 44, justifyContent: "center", borderRadius: 5 }}>
							{/* <Text style={{ color: "#93E396", fontWeight: "600", fontSize: 12, lineHeight: 14, textAlign: "center" }}>Contrato {contratoActual.length !== 0 ? contratoActual : userdata.contrato[0]}</Text> */}
							<Text style={{ color: "#93E396", fontWeight: "600", fontSize: 12, lineHeight: 14, textAlign: "center" }}>Contrato {numeroContrato !== null ? numeroContrato : userD?.usuario?.contrato[0]}</Text>
						</View>
					</View>
					{
						data.map((d, index) => (
							(userdata.rol == "Coordinador" && d.text === "Gestión del Viaje") ||
								(userdata.rol == "Coordinador" && d.text === "Muro de publicaciones") ?
								<MenuBottonItem
									key={index}
									text={d.text}
									onPress={() => navigation.navigate(d.route)}
									img={d.img}
								/> :
								(userdata.rol !== "Coordinador" && d.text !== "Gestión del Viaje") ?
									<MenuBottonItem
										key={index}
										text={d.text}
										onPress={() => navigation.navigate(d.route)}
										img={d.img}
									/> :
									null
						))
					}
				</View>
			</View>
			<View style={{ alignItems: "center", marginTop: "43%" }}>
				<View style={{ width: "80%" }}>
					<View style={{ borderBottomWidth: 1, borderColor: "#8CCBF9" }}>
					</View>
					<TouchableOpacity onPress={singOutSession} style={{ display: "flex", flexDirection: "row", height: 50, alignItems: "center" }}>
						<Image
							source={require("../assets/salir.png")}
							style={{ width: 24, height: 26 }}
						/>
						<Text style={{ color: "#8CCBF9", marginLeft: "3%" }}>
							Cerrar sesión
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ alignItems: "center", marginTop: "43%" }}>
				<View style={{ width: "80%" }}>
					<TouchableOpacity onPress={deleteUser} style={{ display: "flex", flexDirection: "row", height: 50, alignItems: "center" }}>
						<Image
							source={require("../assets/Action_Error.png")}
							style={{ width: 28, height: 28 }}
						/>
						<Text style={{ color: "red", marginLeft: "3%" }}>
							Eliminar cuenta
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			{/* <DrawerItemList {...props} /> */}
		</DrawerContentScrollView>
	);
};


const Drawer = createDrawerNavigator();

function DrawerNavigator() {

	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			screenOptions={{
				drawerActiveBackgroundColor: "orange",
				drawerType: 'front'
			}}
		>
			<Drawer.Screen name="Inicio" component={RouteLanding} options={{ headerShown: false }} />
			<Drawer.Screen name="gestio-contrato" component={GestionContrato} options={{ headerShown: false }} />
			<Drawer.Screen name="info-viaje" component={RouteInicial} options={{ headerShown: false }} />
			{/*<Drawer.Screen name="carga-pasajero " component={CargaPasajero} options={{ headerShown: false }} />
			<Drawer.Screen name="muro" component={RouteMuro} options={{ headerShown: false }} />
			<Drawer.Screen name="ubiViaje" component={Ubicacion} options={{ headerShown: false }} />
			<Drawer.Screen name="folleto-screen" component={Folleto} options={{ headerShown: false }} />
			<Drawer.Screen name="gesViaje" component={RouteGestion} options={{ headerShown: false }} />
			<Drawer.Screen name="Gestionar muro" component={GestionMuro} options={{ headerShown: false }} />
			<Drawer.Screen name="Ajustes" component={Settings} options={{ headerShown: false }} /> */}
		</Drawer.Navigator>
	);
}


const styles = StyleSheet.create({
	drawerHeader: {
		height: 199,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		backgroundColor: "white",
		marginTop: -3.5,
	},
	drawerHeaderText: {
		color: 'black',
		fontSize: 24,
		fontWeight: 'bold',
	},
	drawerImage: {
		width: 180,
		height: 90,
	},
	drawerText: {
		color: 'black',
		fontSize: 14,
		fontWeight: 'bold',
	}
});
export default DrawerNavigator;