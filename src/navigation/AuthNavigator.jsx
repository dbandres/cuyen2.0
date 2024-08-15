import axios from 'axios';
import { RouteInto } from "../intoScreen/RouteInto";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { Login } from '../loginScreen/Login';
import { Register } from '../registerScreen/Register';
import { RegisterOk } from '../registerScreen/RegisterOk';
/*import { ForgotPassword } from '../forgotPass/ForgotPassword';
import { ForgotPassword1 } from '../forgotPass/ForgotPassword1';
import ForgotPassword2 from '../forgotPass/ForgotPassword2';
import { ForgotPassword3 } from '../forgotPass/ForgotPassword3';
import { FinishForgotPass } from '../forgotPass/FinishForgotPass'; */
import DrawerNavigator from './DrawerNavigator';
import { AuthContext } from '../context/AuthContext';
import { setNumeroContrato } from '../slices/contratoActualSlice';
import { useDispatch } from 'react-redux';


const { createStackNavigator } = require("@react-navigation/stack");

const Stack = createStackNavigator()
axios.defaults.baseURL = 'https://www.turismocuyen.com.ar'

export default function AuthNavigator() {

	const {authenticate, setAuthenticate} = useContext(AuthContext)
	const dispatch = useDispatch()

	const showData = async () => {
		const data = await AsyncStorage.getItem("userStorage")
		const parseado = JSON.parse(data)
		if (parseado !== null) {
			setAuthenticate(true)
			dispatch(setNumeroContrato(parseado.usuario.contrato[0]))
		}else{
			setAuthenticate(false)
		}
	}

	useEffect(()=>{
		showData()
	},[authenticate])

	return (
		<Stack.Navigator
		>
			{
				authenticate ?
					<Stack.Screen name="landing" component={DrawerNavigator} options={{ headerShown: false }} />
					:
					<>

						<Stack.Screen name="introScreen" component={RouteInto} options={{ headerShown: false }} />
						<Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
						<Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
						{/* <Stack.Screen name="registerOk" component={RegisterOk} options={{ headerShown: false }} />
						<Stack.Screen name="forgotPass" component={ForgotPassword} options={{ headerShown: false }} />
						<Stack.Screen name="forgotPassOne" component={ForgotPassword1} options={{ headerShown: false }} />
						<Stack.Screen name="forgotPasstwo" component={ForgotPassword2} options={{ headerShown: false }} />
						<Stack.Screen name="forgotPassthree" component={ForgotPassword3} options={{ headerShown: false }} />
						<Stack.Screen name="finishForgotPass" component={FinishForgotPass} options={{ headerShown: false }} />
						<Stack.Screen name="landing" component={DrawerNavigator} options={{ headerShown: false }} /> */}
					</>
			}
			{/* <Stack.Screen name="introScreen" component={RouteInto} options={{ headerShown: false }} />
			<Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
			<Stack.Screen name="register" component={Register} options={{ headerShown: false }} /> */}
		</Stack.Navigator>
	)
}