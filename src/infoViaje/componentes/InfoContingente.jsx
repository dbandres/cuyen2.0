import { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, Animated, Dimensions } from "react-native";
import { InfoXpasajero } from "./InfoXpasajero";

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export function InfoContingente({ pasaje, expandedHijo, onItemPress, index, disableExpand }) {

  const [isExpanded, setIsExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(80));
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        Animated.timing(heightAnim, {
          toValue: 615, // Ajusta según tus necesidades
          //toValue: height + 480,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    } else {
      setIsExpanded(false)
      // Cuando se colapsa, simplemente usa la altura mínima
      Animated.timing(heightAnim, {
        toValue: 80, // Altura mínima
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    if (!isExpanded && disableExpand) {
      return; // No permitir la expansión si otro componente ya está expandido
    }
  
    setIsExpanded(!isExpanded);
    isExpanded ? expandedHijo("") : expandedHijo(1025);
    handlePress();
  };

  const handlePress = () => {
    // Llama a la función de devolución de llamada pasando el índice del elemento
    onItemPress(index);
  };

  return (
    <Animated.View ref={contentRef} style={{ height: heightAnim, width: width * 0.08, marginTop: 10, borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center" }}>
      <View style={{ borderRadius: 10, borderWidth: 1, borderColor: "#CDD1DF", height: isExpanded ? "100%" : 80, width:  width * 0.8, marginBottom: 10, justifyContent: "flex-start", alignItems: "center" }}>
        <TouchableOpacity onPress={toggleExpand} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 80, width: "90%" }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: "#FFB800", alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require('../../assets/attribution.png')}
                style={{ width: 24, height: 24 }}
              />
            </View>
            <View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center" }}>
              <Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
                Pasajero
              </Text>
              <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
                {pasaje.nombre}, {pasaje.apellido}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={toggleExpand}>
              {/* Botón flecha */}
              <Text>{isExpanded ? <Image source={require("../../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {
          isExpanded ?
          <InfoXpasajero
            info={pasaje}
          />
          :
          null
        }
      </View>
    </Animated.View>
  )
}