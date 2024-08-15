import { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native"

export function ResumenDeuda({ data }) {

  const [isExpanded, setIsExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(88));

  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        Animated.timing(heightAnim, {
          toValue: 300, // Ajusta según tus necesidades
          //toValue: height + 480,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    } else {
      setIsExpanded(false)
      // Cuando se colapsa, simplemente usa la altura mínima
      Animated.timing(heightAnim, {
        toValue: 91, // Altura mínima
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    // Envía el índice del componente al padre para gestionar la expansión individual
    setIsExpanded(!isExpanded);
  };


  return (
    <Animated.View ref={contentRef} style={{ height: heightAnim, width: 373, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center" }}>
      <TouchableOpacity onPress={toggleExpand} disabled={data.cuotasPasajero.length !== 0 ? false : true} style={{ width: 333, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: isExpanded ? 91 : "100%", }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: data.cuotasPasajero.length !== 0 ? "#FF3D00" : "#D2DCEB", alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require('../../assets/resumen.png')}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center", }}>
            <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19, marginBottom: 6 }}>
              Resumen de deuda
            </Text>
          </View>
        </View>
        <View>
          <View>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={toggleExpand} disabled={data.cuotasPasajero.length !== 0 ? false : true}>
              {/* Botón flecha */}
              <Text>{isExpanded ? <Image source={require("../../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {
        isExpanded === true && data ?
          <View style={{width:"90%", height:160}}>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center", height:40}}>
              <Image
                source={require("../../assets/request_quote.png")}
                style={{ width: 20, height: 24, marginRight:15 }}
              />
              <Text style={{fontWeight:"400", fontSize:12, lineHeight:30, color:"#949AAF"}}>
                Total a pagar por contrato: <Text style={{fontWeight:"700", fontSize:12, lineHeight:30, color:"#949AAF"}}>${data.cuotasPasajero["Total contrato"]}</Text>
              </Text>
            </View>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center", height:40}}>
              <Image
                source={require("../../assets/cantCuotas.png")}
                style={{ width: 21, height: 24, marginRight:15 }}
              />
              <Text style={{fontWeight:"400", fontSize:12, lineHeight:30, color:"#949AAF"}}>
                Cantidad de cuotas: <Text style={{fontWeight:"700", fontSize:12, lineHeight:30, color:"#949AAF"}}>{data.cuotasPasajero["Cantidad cuotas"]}</Text>
              </Text>
            </View>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center", height:40}}>
              <Image
                source={require("../../assets/paid.png")}
                style={{ width: 24, height: 24, marginRight:12 }}
              />
              <Text style={{fontWeight:"400", fontSize:12, lineHeight:30, color:"#949AAF"}}>
                Monto por cuota: <Text style={{fontWeight:"700", fontSize:12, lineHeight:30, color:"#949AAF"}}>${data.cuotasPasajero["Monto cuota"]}</Text>
              </Text>
            </View>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center", height:40}}>
              <Image
                source={require("../../assets/monto.png")}
                style={{ width: 24, height: 24, marginRight:13 }}
              />
              <Text style={{fontWeight:"400", fontSize:12, lineHeight:30, color:"#949AAF"}}>
                Monto pendiente de pago: <Text style={{fontWeight:"700", fontSize:12, lineHeight:30, color:"#949AAF"}}>${data.cuotasPasajero["Monto pendiente"]}</Text>
              </Text>
            </View>
          </View>
          : null
      }
    </Animated.View>
  )
}