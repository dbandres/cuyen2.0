import { Text, View, Image } from "react-native"


export const Footer = () => {
  return (
    <View style={{ height: 200, alignItems: "center", top: 54}}>
      <View style={{ width: "70%", height: 81}}>
        <View style={{ alignItems: "center", marginBottom:5, width:"100%" }}>
          <Text style={{ fontSize: 10, fontWeight: "600", color:"#3462BF" }}>
            Cuyen Turismo SRL - Legajo 10662
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "600", color:"#3462BF" }}>Dirección: Diagonal Brown 1352, Piso 1 Oficina DyF</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("../assets/Phone1.png")}
              style={{ height: 24, width: 24 }}
            />
            <Text style={{ fontSize: 10, fontWeight: "600", color:"#3462BF" }}>4293-8080</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
            <Image
              source={require("../assets/Whatsapp.png")}
              style={{ height: 24, width: 24, }}
            />
            <Text style={{ fontSize: 10, fontWeight: "600", color:"#3462BF" }}>4293-8080</Text>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
            <Image
              source={require("../assets/Email1.png")}
              style={{ height: 24, width: 24, }}
            />
            <Text style={{ fontSize: 10, fontWeight: "600", color:"#3462BF" }}>info@cuyenturismo.com</Text>
          </View>
      </View>
    </View>
  )
}

