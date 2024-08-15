import { SafeAreaView, ScrollView, StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, Image, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CheckBox from '@react-native-community/checkbox'
import { ButtonCustom } from "../components/ButtomCustom";
import { useDispatch, useSelector } from "react-redux";
import { registerAuth } from "../slices/registerSlice";
import { CustomInput } from "../intoScreen/CustomInput";
import { getVerifyUser, resetUserVerifyState } from "../slices/dniVerifyUser";
import { ModalAlert } from "./ModalAlert";
import { getColegios } from "../slices/getAllColegios";
import { postVerifyColegio } from "../slices/verifyColegios";

const Width = Dimensions.get("screen").width
const Height = Dimensions.get("window").height

export function Register({ navigation }) {

  const { control, handleSubmit, setValue, watch, trigger } = useForm()
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const dispatch = useDispatch()

  const [showAlert1, setShowAlert1] = useState(false)
  const [showAlert3, setShowAlert3] = useState(false)
  const [showAlert4, setShowAlert4] = useState(false)
  const [inputValue, setInputValue] = useState('');
	const [colegiosFiltrados, setColegiosFiltrados] = useState("")

  let dni = watch('userdni')
	let contrato = watch("contrato")
  const pwd = watch("userpass")

	const [errorInput, setErrorInput] = useState('');
	const [colegioSeleccionado, setColegioSeleccionado] = useState("");
	const [match, setMatch] = useState(false)

  const dataRegister = useSelector((state) => state.register.register)
  const errorRegister = useSelector((state) => state.register.error)
  const loadingRegister = useSelector((state) => state.register.loading)

  const verifyUser = useSelector((state) => state.verifyUser.userVerify)
  const loading = useSelector((state) => state.verifyUser.loading)
  const errorVerify = useSelector((state) => state.verifyUser.error)

  const allColegio = useSelector((state)=> state.colegios.colegios)

  const verifyColegio = useSelector((state)=> state.verifyColegios.colegioVerify)
  const loadingVerifyColegios = useSelector((state) => state.verifyColegios.loading)
  const errorVerifyColegios = useSelector((state) => state.verifyColegios.error)

  useEffect(()=>{
    dispatch(getColegios())
  },[])

  const handleSubmitRegister = (data) => {
    const campos = {
      usuario: data.userdni,
      nombre: data.username,
      apellido: data.userlastname,
      email: data.useremail,
      contrato: [data.contrato],
      password: data.userpass,
      rol: "Padre",
      telefono: data.userphone,
      estado: "true"
    }
      // setShowAlert4(true)
      dispatch(registerAuth(campos))
  }

  useEffect(() => {
    if (loadingRegister === true && errorRegister === null) {
      setShowAlert4(true)
    }
    if (errorRegister !== null) {
      console.log(errorRegister);
      setShowAlert4(false)
      setShowAlert3(true)
    }
  }, [errorRegister, loadingRegister])

  useEffect(() => {
    if (dataRegister.length !== 0) {
      setShowAlert4(false)
      navigation.navigate('registerOk')
    }
  }, [dataRegister])

  useEffect(()=>{
    dispatch(resetUserVerifyState())
    if(dni !== undefined && dni.length === 8){
      setShowAlert1(true)
      dispatch(getVerifyUser(dni))
    }
  },[dni])

  useEffect(() => {
		if (inputValue !== "") {
			filterColegios()
		} else {
			filterColegios()
			setColegioSeleccionado("")
		}
	}, [inputValue])

  useEffect(()=>{
		dispatch(resetUserVerifyState())
    setMatch(false)
    if(contrato !== undefined && colegioSeleccionado && contrato.length === 4){
			setShowAlert1(true)
      const data = {
        contrato, colegioSeleccionado
      }
      dispatch(postVerifyColegio(data))
    }

  },[contrato, colegioSeleccionado])

	useEffect(()=>{
		if(errorVerifyColegios !== null){
			setInputValue('')
			setValue('contrato', '')
		}
	},[errorVerifyColegios])

  const myFunction = () => {
		if (verifyUser.length === 0) {
			setShowAlert1(false)
		}
		else {
			goToLogin()
		}
	}

  const goToLogin = () => {
		setShowAlert1(false)
		navigation.navigate("login")
	}

  const handleInputFocus = () => {
		/* if (colegiosFiltrados.length !== 0 && colegioSeleccionado.length === 0) { */
      console.log('entro aca');
			/* setInputValue(''); // Limpiar el valor cuando el TextInput obtiene el foco
			setErrorInput(`Este campo es Requerido`);
		} */
	};
  // Función para manejar el cambio en el valor del TextInput
	const handleInputChange = (text) => {
		setInputValue(text);
		setColegioSeleccionado("")
		if (text.trim() !== '') {
			setErrorInput(''); // Limpiar el mensaje de error cuando se ingrese texto
		}
	};

  // Filtrar el array de objetos basado en el término de búsqueda
	function filterColegios() {
		let filteredData = [];

		if (inputValue.trim() !== '') {
			filteredData = allColegio.filter((item) =>
				item.nombre.toLowerCase().includes(inputValue.toLowerCase())
			).slice(0, 5);
		}

		setColegiosFiltrados(filteredData);
	}

  // Funcion que captura el colegio seleccionado
	const handleColegioPress = (cole) => {
		setColegioSeleccionado(cole);
	};

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF3D00', '#FFB800']}
        style={styles.gradient}
      />
      <View style={{ alignItems: "center", position: "absolute", width: "95%", backgroundColor: "white", height: Height * 0.93, marginTop: Platform.OS === 'ios' ? "10%" : '2%', borderRadius: 10, }}>
				<ScrollView style={{ width: "90%", paddingBottom: 10, height: "auto" }}
					showsVerticalScrollIndicator={false}
				>
					<View style={{ height: "10%", alignItems: "center", justifyContent: "center" }}>
						<Text style={{ color: "#334EA2", fontWeight: "700", fontSize: 16 }}>Registro del Padre/Responsable</Text>
					</View>
					<View style={{ height: 950, marginBottom: 50 }}>
						<View>
							<CustomInput
								control={control}
								placeholder="Numero de contrato"
								name="contrato"
								trigger={trigger}
								numeric="numeric"
								rules={{
									required: true,
								}}
								focus={handleInputFocus}
							/>
							<View>
								<View style={{
									width: "100%",
									flexDirection: 'row',
									alignItems: 'center',
									borderWidth: 1,
									borderColor: verifyColegio === 202 ? "#008000" : '#CDD1DF',
									borderRadius: 10,
									padding: 5,
									height: 50,
								}}>
									<TextInput
										placeholder="Nombre de la Institución"
										value={colegioSeleccionado ? colegioSeleccionado.nombre : inputValue} // Valor del TextInput
										onChangeText={handleInputChange} // Se activa cuando el texto cambia
										style={{
											width: "100%",
											paddingLeft: 10,
											alignItems: "center",
											fontWeight: "600",
											fontSize: 14,
											lineHeight: 16,
											backgroundColor: "white",
											borderRadius: 8,
											color: "#564C71",
										}}
										placeholderTextColor="#CDD1DF"
									/>
								</View>
								<View style={{ height: 25, justifyContent: "center", marginLeft: 20 }}>
									{errorInput !== '' && inputValue === "" ?
										<View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
											<Image
												source={require("../assets/Error.png")}
												style={{ width: 25, height: 25 }}
											/>
											<Text style={{ color: "#FF6363", fontSize: 10, }}>{errorInput}</Text>
										</View>
										: null
									}
								</View>
								{
									colegiosFiltrados.length !== 0 && colegioSeleccionado === "" ?
										<View style={{ position: 'absolute', top: 50, backgroundColor: 'white', width: '100%', height: colegiosFiltrados.length * 30, borderRadius: 10, borderColor: "#CDD1DF", borderWidth: 1, zIndex:1 }}>
											{
												colegiosFiltrados.map((cole, index) => (
													<TouchableOpacity key={index} onPress={() => handleColegioPress(cole)}>
														<Text style={{ paddingVertical: 5, paddingHorizontal: 15, fontSize: 12 }}>{cole.nombre}</Text>
													</TouchableOpacity>
												))
											}
										</View>
										:
										null
								}
							</View>
							<CustomInput
								control={control}
								placeholder="Ingresa tu DNI"
								name="userdni"
								trigger={trigger}
								numeric="numeric"
								focus={handleInputFocus}
								rules={{
									required: true,
									// pattern: { value: /^[0-9]+$/, message: "El DNI es incorrecto" },
									minLength: {
										value: 7,
										message: "El DNI ingresado no es válido."
									},
									maxLength: {
										value: 8,
										message: "El DNI ingresado no es válido."
									}
								}}
							/>
							<CustomInput
								control={control}
								name="username"
								placeholder="Nombre"
								trigger={trigger}
								focus={handleInputFocus}
								rules={{
									required: true,
									pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, message: "El Nombre es incorrecto" },
									minLength: {
										value: 2,
										message: "El Nombre no es válido."
									},
									maxLength: {
										value: 15,
										message: "El Nombre no es válido."
									}
								}}
							/>
							<CustomInput
								control={control}
								name="userlastname"
								placeholder="Apellido"
								trigger={trigger}
								focus={handleInputFocus}
								rules={{
									required: true,
									pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, message: "El Nombre es incorrecto" },
									minLength: {
										value: 2,
										message: "El Apellido no es válido."
									},
									maxLength: {
										value: 15,
										message: "El Apellido no es válido."
									}
								}}
							/>
							<CustomInput
								control={control}
								name="useremail"
								placeholder="Email"
								trigger={trigger}
								focus={handleInputFocus}
								rules={{
									required: true,
									pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "El Email ingresado no es válido." }
								}}
							/>
							<CustomInput
								control={control}
								name="userphone"
								numeric="numeric"
								trigger={trigger}
								focus={handleInputFocus}
								placeholder="Número de Celular"
								rules={{
									required: true,
									pattern: { value: /^[0-9]+$/, message: "El Número ingresado no es válido." },
									minLength: {
										value: 9,
										message: "El Numero de celular ingresado no es válido."
									},

								}}
							/>

							<CustomInput
								control={control}
								placeholder="Crea tu contraseña"
								name="userpass"
								secureTextEntry
								numeric="numeric"
								trigger={trigger}
								focus={handleInputFocus}
								rules={{
									required: true,
									minLength: {
										value: 4,
										message: "La Contraseña debe tener 4 caracteres"
									},
									maxLength:{
										value: 4,
										message: "La Contraseña debe tener 4 caracteres"
									}
								}}
							/>

							<CustomInput
								control={control}
								placeholder="Repite tu contraseña"
								name="userpassrepeat"
								secureTextEntry
								numeric="numeric"
								trigger={trigger}
								focus={handleInputFocus}
								rules={{
									required: true,
									validate: value => value === pwd || "Las Contraseñas no coinciden",
									minLength: {
										value: 4,
										message: "La Contraseña debe tener 4 caracteres"
									},
									maxLength:{
										value: 4,
										message: "La Contraseña debe tener 4 caracteres"
									}
								}}
							/>


							<View style={{ height: "5%", display: "flex", flexDirection: "row", marginTop: "3%" }}>
								<View>
									<CheckBox
										disabled={false}
										value={toggleCheckBox}
										onValueChange={(newValue) => setToggleCheckBox(newValue)}
										tintColors={true ? "black" : "black"}
										boxType='square'
										style={{ transform: Platform.OS === 'ios' ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : '', justifyContent:'center', alignItems:'center'}}
									/>
								</View>
								<View style={{ marginLeft: "3%" }}>
									<Text style={{ fontSize: 12, color: "#949AAF" }}>
										Estoy de acuerdo con los
									</Text>
									<Text style={{ fontWeight: "bold", fontSize: 11.5, color: "#949AAF" }}>
										Términos de Servicios y Política de privacidad.
									</Text>
								</View>
							</View>
							<View style={{ height: "7%", marginTop: "5%" }}>
								<ButtonCustom
									text="Registrarme"
									color={toggleCheckBox === false ? "#CDD1DF" : "#FF3D00"}
									disabled={toggleCheckBox === false ? true : false}
									onPress={handleSubmit(handleSubmitRegister)}
								/>
							</View>
							<View style={{ height: "7%", marginTop: "2%", borderColor: "#3462BF", borderWidth: 1, borderRadius: 10, marginBottom: 10 }}>
								<ButtonCustom
									text="Cancelar"
									color="#FFFFFF"
									register={true}
									onPress={() => { navigation.navigate("login") }}
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
      <ModalAlert
        loading={loadingVerifyColegios || loading}
        onClose={myFunction} 
        visible={showAlert1}
        texto={verifyUser}
        error={errorVerify || errorVerifyColegios}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold"
  }, gradient: {
    flex: 1,
    width: "100%"
  },
})