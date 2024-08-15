import { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native"

export const DropdownFDP = ({ isExpanded, setIsExpanded, contentRef, heightAnim, setFDPSeleccionado, FDPSeleccionado, FDPResponse }) => {

  const [FDP, setFDP] = useState('')

  function formatString(s) {
    return s
      .replace(/_/g, ' ')        // Reemplaza el guion bajo por un espacio
      .replace(/\b\w/g, char => char.toUpperCase()); // Pone en mayúscula la primera letra de cada palabra
  }

  useEffect(() => {
    // Generar el array de objetos
    const resultArray = FDPResponse.map(key => {
      return { titulo: formatString(key), valor: key };
    });
    setFDP(resultArray)
  }, [FDPResponse])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const selctFDP = (value) => {
    setFDPSeleccionado(value)
    toggleExpand()
  }

  return (
    <View>
      <Animated.View ref={contentRef} style={{
        height: heightAnim, width: 331, backgroundColor: "white", borderRadius: 10, padding: "2%", justifyContent: "space-between", alignItems: "flex-start", flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#CDD1DF',
        marginBottom: 15
      }}>
        <TouchableOpacity onPress={() => { toggleExpand() }} style={{ width: "100%", justifyContent: "space-between", display: "flex", flexDirection: "row", borderBottomWidth: isExpanded === true ? 1 : 0, borderColor: "#CDD1DF" }}>
          <View style={{ width: "80%", height: 30, justifyContent: "flex-start", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Image source={require("../assets/request_quote.png")} style={{ width: 16, height: 20 }} />
            {
              FDPSeleccionado.titulo ?
                <Text style={{ color: "#564C71", fontWeight: "600", fontSize: 14, lineHeight: 16, marginLeft: 10 }}>
                  {FDPSeleccionado.titulo}
                </Text>
                :
                <Text style={{ color: "#CDD1DF", fontWeight: "600", fontSize: 14, lineHeight: 16, marginLeft: 10 }}>
                  Formas de pago
                </Text>
            }
          </View>
          <TouchableOpacity onPress={() => { toggleExpand() }} style={{ alignItems: 'center' }}>
            {/* Botón flecha */}
            <Text>{isExpanded ? <Image source={require("../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{ width: "100%", height: "80%", marginTop: 10 }}>
          {
            isExpanded === true ?
              FDP.map((fdp, index) => (
                <TouchableOpacity onPress={() => { selctFDP(fdp) }} key={index} style={{ borderRadius: 10, height: 24, justifyContent: "center" }}>
                  <Text style={{ fontWeight: "600", fontSize: 14, lineHeight: 16, color: fdp.titulo === FDPSeleccionado.titulo ? "#564C71" : '#CDD1DF', marginLeft: 5 }}>
                    {fdp.titulo}
                  </Text>
                </TouchableOpacity>
              ))
              :
              null
          }
        </View>
      </Animated.View>
    </View>
  )
}