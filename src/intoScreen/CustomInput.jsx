import { Text, View, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Controller } from "react-hook-form";
import { useState } from "react";

export function CustomInput({ control, name, placeholder, rules = {}, secureTextEntry, editable,
	multiline, numberOfLines, maxLength, numeric, formIntro, formContact, trigger, focus }) {

	const [visibility, setVisibility] = useState(false)

	const changeVisibility = () => {
		setVisibility(!visibility)
	}


	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
				<>
					<View style={{
						width: "100%",
						flexDirection: 'row',
						alignItems: 'center',
						borderWidth: 1,
						borderColor: '#CDD1DF',
						borderRadius: 10,
						padding: formIntro === true ? 0 : 5,
						height: multiline === true ? 150 : 50,
					}}>
						{
							placeholder === "Crea tu contraseña" ?
								<Image
									source={require("../assets/key.png")}
									style={{ width: 18, height: 10 }}
								/>
								:
								placeholder === "Repite tu contraseña" ?
									<Image
										source={require("../assets/key.png")}
										style={{ width: 18, height: 10 }}
									/>
									:
									placeholder === "Apellido" || placeholder === "Nombre" ?
										<Image
											source={require("../assets/account.png")}
											style={{ width: 18, height: 18 }}
										/>
										:
										placeholder === "Ingresa tu DNI" ?
											<Image
												source={require("../assets/badge.png")}
												style={{ width: 18, height: 18 }}
											/>
											:
											placeholder === "Email" ?
												<Image
													source={require("../assets/alternate_email.png")}
													style={{ width: 18, height: 18 }}
												/>
												:
												placeholder === "Número de Celular" ?
													<Image
														source={require("../assets/mobile_friendly.png")}
														style={{ width: 18, height: 22 }}
													/>
												:
												placeholder === "Importe del viaje" ?
												<Image
														source={require("../assets/attach_money.png")}
														style={{ width: 10, height: 18 }}
													/>
													:
													null
						}
						<TextInput
							placeholder={placeholder}
							value={value}
							onChangeText={onChange}
							onBlur={() => trigger(name)}
							formIntro={formIntro}
							secureTextEntry={visibility !== true ? secureTextEntry : false}
							editable={editable}
							multiline={multiline}
							numberOfLines={numberOfLines}
							maxLength={maxLength}
							onFocus={focus}
							style={{
								width: formIntro === true ? "100%" : "85%",
								paddingLeft: 10,
								alignItems: "center",
								fontWeight: "600",
								fontSize: 14,
								lineHeight: 16,
								backgroundColor: formIntro === true ? "white" : "transparent",
								borderRadius: 8,
								color: "#564C71",
                height:'100%'
							}}
							placeholderTextColor="#CDD1DF"
							keyboardType={numeric}
							
						/>
						{
							secureTextEntry === true ?
								<TouchableOpacity onPress={changeVisibility} style={{ width: "10%" }}>
									{
										visibility === false ?
											<Image
												source={require("../assets/visibility_off.png")}
												style={{ width: 20, height: 20 }}
											/> :
											<Image
												source={require("../assets/Visibility_ON.png")}
												style={{ width: 25, height: 25, }}
											/>
									}
								</TouchableOpacity>
								: null
						}
					</View>
					<View style={{ height: 25, justifyContent: "center", marginLeft: 20 }}>
						{error && 
							<View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
								<Image
									source={require("../assets/Error.png")}
									style={{ width: 25, height: 25 }}
								/>
								{
									formContact === true ?
									<Text style={{ color: "white", fontSize: 10 }}>{error.message || `Este campo es Requerido`}</Text>:
									<Text style={{ color: "#FF6363", fontSize: 10 }}>{error.message || `Este campo es Requerido`}</Text>
								}
							</View>
						}
					</View>
				</>
			)}
		/>
	)
}

const styles = StyleSheet.create({
	icon: {
		marginHorizontal: 5,
	},
	input: {
		flex: 1,
	},
	textInputStyle: {
		width: "85%",
		paddingLeft: 10,
		alignItems: "center",
		fontWeight: "600",
		fontSize: 14,
		lineHeight: 16,
	}
});