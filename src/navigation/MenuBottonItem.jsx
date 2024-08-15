import { Text, TouchableOpacity, View, Image } from "react-native"


export const MenuBottonItem = ({ text, onPress, img }) => {
  return (
    <View style={{ width: "100%", justifyContent: "center", height: "25%" }}>
      <TouchableOpacity
        onPress={onPress}
        style={{ display: "flex", flexDirection: "row" }}
      >
        {
          img === "infoViaje" ?
            <Image
              source={require("../assets/quick_reference.png")}
              style={{ width: 24, height: 26 }}
            />
            :
            img === "cargaPasajero" ?
              <Image
                source={require("../assets/3p.png")}
                style={{ width: 24, height: 26 }}
              /> :
              img === "muro" ?
                <Image
                  source={require("../assets/wall_art.png")}
                  style={{ width: 24, height: 26 }}
                /> :
                <Image
                  source={require("../assets/explore.png")}
                  style={{ width: 24, height: 26 }}
                />
        }
        <View style={{justifyContent:"center", marginLeft:"3%"}}>
          <Text style={{ color: "#FFFFFF", fontWeight: "400", fontSize: 14 }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}