import { View, TouchableOpacity, Image, Text } from "react-native"


export const ButtomTabs = ({navigation}) => {

  const gotToLogin = () => {
    navigation.navigate("login")
  }

  return (
    <View style={{ backgroundColor: "#162962", height: 74, alignItems: "center", justifyContent: "center", flexDirection: "row", width:"100%" }}>
      <View style={{ width: "20%", bottom: "2%", backgroundColor: "#162962", alignItems: "center", justifyContent: "center", borderRadius: 50, height: "110%", marginBottom:"3%" }}>
        <TouchableOpacity style={{ marginBottom:"20%" }} onPress={gotToLogin}>
          <Image
            source={require("../assets/account_circle.png")}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 10 }}>Iniciar sesión</Text>
      </View>
    </View>
  )
}