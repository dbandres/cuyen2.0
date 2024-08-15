import { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress"

export function EstadoDePagosComponent({ data }) {

  const [isExpanded, setIsExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(88));

  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        Animated.timing(heightAnim, {
          toValue: 250, // Ajusta según tus necesidades
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

  const calcularFill = () => {
    const result = 100 / data.cuotasPasajero["Cantidad cuotas"]
    return result
  }

  const impagas = () => {
    const fill = calcularFill(); //porcentaje que ocupa cada cuota en el grafico
    const resultImpagas = fill * data.cuotasPasajero["Cuotas impagas"] //miltiplucamos el porsentaje por la cantidad de cuotas impagas
    return resultImpagas
  }

  const pagadas = () => {
    const fill = calcularFill(); //porcentaje que ocupa cada cuota en el grafico
    const resultPagadas = fill * data.cuotasPasajero["Cuotas pagas"]
    return resultPagadas
  }

  const vencidas = () => {
    const fill = calcularFill(); //porcentaje que ocupa cada cuota en el grafico
    const resultVencidas = fill * data.cuotasPasajero["Cuotas vencidas"]
    return resultVencidas
  }


  return (
    <Animated.View ref={contentRef} style={{ height: heightAnim, width: 373, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center" }}>
      <TouchableOpacity onPress={toggleExpand} disabled={data.cuotasPasajero.length !== 0 ? false : true} style={{ width: 333, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: isExpanded ? 91 : "100%", }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: data.cuotasPasajero.length !== 0  ? "#FF3D00" : "#D2DCEB", alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require('../../assets/estado.png')}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center", }}>
            <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19, marginBottom: 6 }}>
              Estado de pagos
            </Text>
          </View>
        </View>
        <View>
          <View>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={toggleExpand} disabled={data.cuotasPasajero.length !== 0  ? false : true}>
              {/* Botón flecha */}
              <Text>{isExpanded ? <Image source={require("../../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {
        isExpanded === true ?
          <View style={{ width: "90%", height: 130, justifyContent: "space-between", alignItems: "center", display: "flex", flexDirection: "row" }}>
            <View style={{ height: 130 }}>
              <View style={{width:70, height:70, transform: [{ rotate: '270deg' }] }}>
                <AnimatedCircularProgress
                  size={70}
                  width={10}
                  fill={pagadas()}
                  tintColor="#93E396"
                  onAnimationComplete={() => console.log('onAnimationComplete')}
                  backgroundColor="#D9D9D9" />
                <View style={{ position: "absolute", right: "45%", top: "43%", transform: [{ rotate: '90deg' }] }} >
                  <Text style={{ fontWeight: "500", fontSize: 10, lineHeight: 12, textAlign: "center", color: "#564C71" }}>{data.cuotasPasajero["Cuotas pagas"]}</Text>
                </View>
              </View>
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontWeight: "500", fontSize: 10, lineHeight: 12, textAlign: "center", color: "#564C71" }}>Cuotas pagadas</Text>
              </View>
            </View>


            <View style={{ height: 130 }}>
              <View style={{width:70, height:70, transform: [{ rotate: '270deg' }] }}>
                <AnimatedCircularProgress
                  size={70}
                  width={10}
                  fill={impagas()}
                  tintColor="#93E396"
                  onAnimationComplete={() => console.log('onAnimationComplete')}
                  backgroundColor="#D9D9D9" />
                <View style={{ position: "absolute", right: "45%", top: "43%", transform: [{ rotate: '90deg' }], }}>
                  <Text style={{ fontWeight: "500", fontSize: 10, lineHeight: 12, textAlign: "center", color: "#564C71" }}>{data.cuotasPasajero["Cuotas impagas"]}</Text>
                </View>
              </View>
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontWeight: "500", fontSize: 10, lineHeight: 12, textAlign: "center", color: "#564C71" }}>Cuotas impagas</Text>
              </View>
            </View>


            <View style={{ height: 130 }}>
              <View style={{width:70, height:70, transform: [{ rotate: '270deg' }] }}>
                <AnimatedCircularProgress
                  size={70}
                  width={10}
                  fill={vencidas()}
                  tintColor="#FF6363"
                  onAnimationComplete={() => console.log('onAnimationComplete')}
                  backgroundColor="#D9D9D9" />
                <View style={{ position: "absolute", right: "45%", top: "43%", transform: [{ rotate: '90deg' }], }}>
                  <Text style={{ fontWeight: "500", fontSize: 10, lineHeight: 12, textAlign: "center", color: "#564C71" }}>{data.cuotasPasajero["Cuotas vencidas"]}</Text>
                </View>
              </View>
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontWeight: "500", fontSize: 10, lineHeight: 12, textAlign: "center", color: "#564C71" }}>Cuotas vencidas</Text>
              </View>
            </View>
          </View>
          :
          null
      }
    </Animated.View>
  )
}