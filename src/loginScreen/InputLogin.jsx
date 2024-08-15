import { Text, View, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Controller } from "react-hook-form";
import { useState } from "react";

export function InputLogin({ control, name, placeholder, rules = {}, secureTextEntry, maxLength, numeric, trigger }) {

	const [visibility, setVisibility] = useState(false)

	const changeVisibility =()=>{
		setVisibility(!visibility)
	}

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
				<>
					<View style={styles.inputContainer}>
						{
							placeholder == "Contraseña" ?
								<Image
									source={require("../assets/key.png")}
									style={{ width: 18, height: 10 }}
								/> :
								<Image
									source={require("../assets/badge.png")}
									style={{ width: 18, height: 17 }}
								/>
						}
						<TextInput
							placeholder={placeholder}
							value={value}
							onChangeText={onChange}
							onBlur={() => trigger(name)}
							secureTextEntry={visibility !== true ? secureTextEntry : false}
							maxLength={maxLength}
							keyboardType={numeric}
							style={{ width: "85%", paddingLeft: 10, alignItems: "center", fontWeight: "600", fontSize: 14, lineHeight: 16, color:"#564C71" }}
							placeholderTextColor="#CDD1DF"
						/>
						<TouchableOpacity onPress={changeVisibility} style={{width:"10%"}}>
							{
								visibility === false ?
								<Image
								source={require("../assets/visibility_off.png")}
								style={{ width: 20, height: 20}}
							/>:
							<Image
								source={require("../assets/Visibility_ON.png")}
								style={{ width: 25, height: 25,}}
							/>
							}
						</TouchableOpacity>
					</View>
					{error && <Text style={{ color: "red", fontSize: 10 }}> {error.message || `Este campo es Requerido`}</Text>}
				</>
			)}
		/>
	)
}

const styles = StyleSheet.create({
	inputContainer: {
		width: "100%",
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
		padding: 5,
		height: 50,
		marginBottom: "3%",
	},
	icon: {
		marginHorizontal: 5,
	},
	input: {
		flex: 1,
	},
});