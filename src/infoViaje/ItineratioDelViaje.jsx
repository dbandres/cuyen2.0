import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { Header } from "../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getItinerario } from "../slices/getItinerarioSlice";
import { ExpandibleItinerarioInfo } from "./ExpandibleItinerarioInfo";
import { getDestino } from "../slices/getDestinoSlice";


export const ItineratioDelViaje = ({ navigation }) => {

  const dispatch = useDispatch()
  const numeroContrato = useSelector((state) => state.contratoActual.numero);
  const itinerario = useSelector((state) => state.itinerario.itinerario)
  const destino = useSelector((state)=> state.destino.destino)
  const [textoGral, setTextoGral] = useState("")

  useEffect(() => {
    dispatch(getItinerario(numeroContrato))
    dispatch(getDestino(numeroContrato))
  }, [numeroContrato])

  useEffect(() => {
    if (itinerario.length !== 0) {
      setTextoGral(JSON.parse(itinerario.texto_gral))
    } else {
      setTextoGral("")
    }
  }, [itinerario])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header children="Itinerario de viaje" navigation={navigation} />
        <ScrollView>
          <View style={{ width: 373, height: 91, backgroundColor: "#FFFFFF", marginTop: 20, borderRadius: 10, alignItems: "center", justifyContent: "flex-start", display: "flex", flexDirection: "row", padding: 20 }}>
            <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: "#FF3D00", alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require('../assets/destino.png')}
                style={{ width: 24, height: 24 }}
              />
            </View>
            <View style={{ marginLeft: 15, height: 48,  justifyContent: "center" }}>
              {
                destino.length !== 0 ?
                  <>
                    <Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
                      Destino
                    </Text>
                    <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
                      {destino.destino}
                    </Text>
                  </>
                  :
                  <Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
                    Sin destino Disponible
                  </Text>
              }
            </View>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
            <View style={{ width: 331, height: 88, backgroundColor: "#FFFFFF", borderRadius: 10, marginTop: 20, alignItems: "center", justifyContent: "flex-start", display: "flex", flexDirection: "row", padding: 20, marginBottom: 10 }}>
              <View style={{ width: 44, height: 44, borderRadius: 50, backgroundColor: "#3FA9F5", alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require('../assets/info.png')}
                  style={{ width: 20, height: 20 }}
                />
              </View>
              <View style={{ height: 48, width: "80%", alignItems: "center", justifyContent: "center", marginLeft: 10 }}>
                <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 10, lineHeight: 12 }}>El día y horario de las excursiones puede varias según las condiciones climáticas o las necesidades de cada grupo.</Text>
              </View>
            </View>
            {
              textoGral.length !== 0 ?
                textoGral.map((texto, index) => (
                  <ExpandibleItinerarioInfo key={index} data={texto}/>
                )) :
                <View>
                  <Text style={{ color: "#564C71" }}>
                    El itinerario no esta disponible
                  </Text>
                </View>
            }
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D2DCEB",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
})