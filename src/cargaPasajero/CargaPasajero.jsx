import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useContext, useEffect, useState } from "react"
/* import { Form } from "./Form"; */
import { Header } from "../components/Header";
import { Form } from "./Form";

export function CargaPasajero({ navigation }) {

	const [showForm, setShowForm] = useState(false)

	const agregarPasajero = () => {
		setShowForm(!showForm)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
				<View style={{
					flex: 1, display: "flex",
					alignItems: "center",
					justifyContent: "flex-start"
				}}>
					<Header
						children="Registro de pasajero"
						navigation={navigation}
					/>
					{
						showForm !== false ?
						<>
							<Form 
							agregarPasajero={agregarPasajero}
							navigation={navigation}
							/>
						</>
						: null
					}
					<View style={{ height: 90 }}>
						<TouchableOpacity onPress={agregarPasajero} style={{ width: 331, height: 47, backgroundColor: "#FFFFFF", borderRadius: 10, top: 20, justifyContent: "center", alignItems: "center", }}>
							<Text style={{ color: "#334EA2", fontWeight: "600", fontSize: 12, lineHeight: 14, textAlign: "center" }}>
								Agregar Pasajero
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#D2DCEB",
		flex: 1,

	}
})
