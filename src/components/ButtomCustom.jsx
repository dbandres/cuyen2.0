import { Dimensions, Text, TouchableOpacity } from "react-native";

export function ButtonCustom({ onPress, text, disabled, color, register }) {

	return (
		<TouchableOpacity disabled={disabled} onPress={onPress} style={{backgroundColor:color, width: "100%", height: "100%", borderRadius: 10, display: "flex", alignItems: "center", justifyContent:"center"}}>
			<Text style={{color: register === true ? "#3462BF" : "white", fontSize: 12, fontWeight:"600", lineHeight:14}}>{text}</Text>
		</TouchableOpacity>
	)
}