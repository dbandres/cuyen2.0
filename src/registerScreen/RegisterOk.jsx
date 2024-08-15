import { View, Text, StyleSheet, Image } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useEffect } from "react";



export const RegisterOk = ({ navigation }) => {

  const goToHome = () => {
    navigation.navigate("login")
  }

  useEffect(() => {
    setTimeout(() => {
      goToHome()
    }, 3000)
  }, [])

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF3D00', '#FFB800']}
        style={styles.gradient}
      />
      <View style={{ alignItems: "center", position: "absolute", width: "95%", backgroundColor: "white", height: "95%", marginTop: "2%", borderRadius: 10, justifyContent: "center" }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/Action_Correct.png")}
            style={{ width: 128, height: 128 }}
          />
          <View style={{ marginTop: "4%", width: 170, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", lineHeight: 19, color: "#000000", textAlign: "center" }}>
              ¡Usuario dado de alta
              con éxito!
            </Text>
          </View>
        </View>
        <View style={{ bottom: 130, position: "absolute", width: "58%", height: "7%", }}>
          <Text style={{ fontWeight: "600", fontSize: 12, color: "#949AAF", lineHeight: 14, textAlign: "center" }}>
            Será redireccionado automáticamente al Login ahora mismo...
          </Text>
        </View>
      </View>
    </View>
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