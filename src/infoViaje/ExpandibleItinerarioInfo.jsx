import { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, Animated } from "react-native";


export function ExpandibleItinerarioInfo({ data }) {

  const [isExpanded, setIsExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(88));
  const contentRef = useRef(null);
  const [estadoHeight, setEstadoHeight] = useState("")

  const toggleExpand = () => {
    // Envía el índice del componente al padre para gestionar la expansión individual
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        console.log("he: ", height)
        Animated.timing(heightAnim, {
          toValue: 25 + 120, // Ajusta según tus necesidades
          //toValue: height + 480,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    } else {
      setIsExpanded(false)
      // Cuando se colapsa, simplemente usa la altura mínima
      Animated.timing(heightAnim, {
        toValue: 70, // Altura mínima
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

  return (
    <Animated.View ref={contentRef} style={{ height: heightAnim, width: 331, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center" }}>

      <TouchableOpacity onPress={toggleExpand} style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: isExpanded ? 70 : "100%" }}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: "#FF3D00", marginLeft: 20, justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("../assets/mapita.png")}
              style={{ width: 32, height: 28 }}
            />
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontWeight: "800", fontSize: 12, lineHeight: 14, color: "#564C71" }}>{data.titulo}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={toggleExpand}>
            {/* Botón flecha */}
            <Text>{isExpanded ? <Image source={require("../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View style={{ width: "100%", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "row", marginTop: 5 }}>
        {
          isExpanded ?
            <View style={{ backgroundColor: "#E9F2FF", width: "100%", borderRadius: 7, justifyContent: "center", alignItems: "center" }}>
              <View style={{ width: "98%", height: data.descripcion.length > 46 ? 33 : 25, justifyContent: "center", padding: 5 }}>
                <Text style={{ fontWeight: "400", fontSize: 10, lineHeight: 12, color: "#564C71" }}>* {data.descripcion}</Text>
              </View>
            </View>
            :
            null
        }
      </View>
    </Animated.View>
  )
}