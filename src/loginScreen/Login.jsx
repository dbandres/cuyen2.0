import { KeyboardAvoidingView, Platform, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { ContainerWithBackground } from "../components/ContainerWithBackground";
import { useForm } from "react-hook-form";
import { InputLogin } from "./InputLogin";
import { ButtonCustom } from "../components/ButtomCustom";
import AwesomeAlert from "react-native-awesome-alerts";
import { useDispatch, useSelector } from "react-redux";
import { loginAut } from "../slices/loginSlice";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";



export function Login({navigation}) {

  const { control, handleSubmit, watch, trigger } = useForm()
	const {setAuthenticate} = useContext(AuthContext)

  const [inputValue, setInputValue] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
	const [showAlert2, setShowAlert2] = useState(false)

	const dataLogin = useSelector((state) => state.login.login)
	const errorLogin = useSelector((state) => state.login.error)
	const loadingLogin = useSelector((state) => state.login.loading)

	const dispatch = useDispatch()

  const showAlerts = (show, setShow, titulo, msg, text) => {
		return (
			<AwesomeAlert
				show={show}
				showProgress={false}
				title={titulo}
				message={msg}
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={false}
				showConfirmButton={true}
				confirmText={text}
				confirmButtonColor="#DD6B55"
				onConfirmPressed={() => setShow(false)}
			/>
		);
	}

	const getAlert = () => {
		return (
			<AwesomeAlert
				show={showAlert2}
				showProgress={true}
				progressColor="black"
				progressSize={50}
				closeOnTouchOutside={false}
			/>
		)
	}

  const authentication = (data) =>{
		dispatch(loginAut(data))
  }

  const watchControl =()=>{
		const dniValue = watch("dniUser");
		const passValue = watch("passUser")
		if(dniValue && passValue){
			setInputValue(true)
		}
		else{
			setInputValue(false)
		}
	}

	useEffect(() => {
		watchControl()
	}, [watch("dniUser"), watch("passUser")])

	useEffect(()=>{
		if(loadingLogin === true && errorLogin === null){
			setShowAlert2(true)
		}
		if(errorLogin !== null){
			setShowAlert2(false)
			setShowAlert(true)
		}
	},[errorLogin, loadingLogin])

	useEffect(()=>{
		if(dataLogin.length !== 0){
			console.log('data login es distinto de cero');
			setShowAlert2(false)
			setAuthenticate(true)
		}
	},[dataLogin])

  return (
    <SafeAreaView style={{flex:1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
      <View style={{ height: '100%', width: '100%' }}>
        <ContainerWithBackground>
          <View style={{ height: 450, width: "100%", alignItems: "center" }}>
            <View style={{ height: "100%", width: "90%", justifyContent: "center", top: 60  }}>
              <InputLogin
                control={control}
                placeholder="DNI"
                name="dniUser"
                numeric="numeric"
                secureTextEntry={true}
								trigger={trigger}
              />
              <InputLogin
                control={control}
                placeholder="Contraseña"
                name="passUser"
                numeric="numeric"
                secureTextEntry={true}
								trigger={trigger}
              />
              <View style={{ top: 50 }}>
						<View style={{ height: 47, width: "100%" }}>
							<ButtonCustom
								text="Ingresar"
								color={inputValue !== false ? "#FF3D00" : "#CDD1DF"}
								disabled={inputValue !== false ? false : true}
								onPress={handleSubmit(authentication)}
							/>
						</View>
						<View style={{ height: 47, marginTop: "2%", width: "100%", borderColor: "#3462BF", borderWidth: 1, borderRadius: 10 }}>
							<ButtonCustom
								text="Registrarse"
								color="#FFFFFF"
								register={true}
								onPress={() => { navigation.navigate("register") }}
							/>
						</View>
						<View style={{ height: "10%", display: "flex", justifyContent: "center", alignItems: "center", marginTop:6 }}>
							<TouchableOpacity onPress={() => { navigation.navigate("forgotPass") }}>
								<Text style={{ textDecorationLine: "underline", color: "#949AAF", fontWeight: "400", fontSize: 12 }}>
									Olvidé mi contraseña
								</Text>
							</TouchableOpacity>
						</View>
					</View>
            </View>
          </View>
        </ContainerWithBackground>
      </View>
      </KeyboardAvoidingView>
      {showAlerts(showAlert, setShowAlert, "Error!", "Es posible que tus datos sean incorrectos, verifícalos", "Ok")}
			{showAlert2 ? getAlert() : null}
    </SafeAreaView>
  )
}