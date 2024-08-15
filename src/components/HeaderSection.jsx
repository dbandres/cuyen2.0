import { useRoute } from "@react-navigation/native";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient"

const Width = Dimensions.get("screen").width
const Height = Dimensions.get("window").height

export default function HeaderSection({scrollToContacto}){

  const route = useRoute()


  return(
    <View style={{ height: 287, alignItems:"center" }}>
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF3D00', '#FFB800']}
        style={styles.gradient}
      />
      <View style={{ alignItems: "center", position: "absolute", top: "9%", height: "15%", right: 0, left: 0 }}>
        {
          route.name !== "intro-screen" ?
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "93%", height: "40%", alignItems: "center" }}>
            <View>
                <Text style={{ color: "white", fontWeight: "600", fontSize: 16, lineHeight: 19 }}>¡Bienvenido!</Text>
              </View>
          </View>
          : null
        }
      </View>
      <View style={{
        backgroundColor: "white",
        width: Width * 0.95,
        height: 178,
        position: "absolute",
        borderRadius: 10,
        top: 80,
        justifyContent: 'center',
        alignItems: "center"
      }}>
        <Image
          source={require("../assets/logoCuyen.png")}
          style={{ height: 91, width: 199 }}
        />
      </View>
      <View style={styles.containerBottons}>
        <TouchableOpacity onPress={()=>{abrirLink("https://www.instagram.com/cuyenturismo/")}}>
          <Image
            source={require("../assets/insta.png")}
            style={{ height: 55, width: 50, marginRight: "2%" }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{abrirLink("https://www.facebook.com/cuyenturismo/?locale=es_LA")}}>
          <Image
            source={require("../assets/Facebo.png")}
            style={{ height: 55, width: 50, marginRight: "2%" }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={scrollToContacto}>
          <Image
            source={require("../assets/Email.png")}
            style={{ height: 55, width: 50 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerBottons: {
    backgroundColor: "transparent",
    width: "100%",
    height: 60,
    top: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  gradient: {
    height: 199,
    width: "100%"
  }
})