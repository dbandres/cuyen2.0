import { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux";
import { setNumeroContrato } from "../slices/contratoActualSlice";

export const InfoContrato = ({contratoInfo, navigation}) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(88));
  const contentRef = useRef(null);
  const dispatch = useDispatch()

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
          toValue: 290, // Ajusta según tus necesidades
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

  const select = (num) =>{
    dispatch(setNumeroContrato(num))
    toggleExpand()
    navigation.openDrawer();
  }

  return (
    <Animated.View ref={contentRef} style={{ height: heightAnim, width: 373, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center" }}>
      {
        contratoInfo !== "" ?
          <TouchableOpacity onPress={toggleExpand} style={{ width: 333, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: isExpanded ? 91 : "100%" }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: "#FF3D00", alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require('../assets/contract_white.png')}
                  style={{ width: 24, height: 24 }}
                />
              </View>
              <View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center", }}>
                <Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
                  Contrato {contratoInfo.num}
                </Text>
                <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 12, lineHeight: 19 }}>
                  {contratoInfo?.colegio}, {contratoInfo?.curso?.trim()} - {contratoInfo?.division?.trim()}
                </Text>
              </View>
            </View>
            <View>
              <View>
                {
                  contratoInfo !== "" ?
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={toggleExpand}>
                      {/* Botón flecha */}
                      <Text>{isExpanded ? <Image source={require("../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
                    </TouchableOpacity>
                    : null
                }
              </View>
            </View>
          </TouchableOpacity>
          :
          <Text>
            Cargando información...
          </Text>
      }
      {
        isExpanded === true ?
          <View style={{ width: "90%" }}>
            <View style={{ display: "flex", flexDirection: "row", }}>
              <Text style={styles.titulo}>
                Curso/División
              </Text>
              <Text style={styles.texto}>
                {contratoInfo.curso.trim()} - {contratoInfo.division.trim()} - {contratoInfo.turno.trim()}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", }}>
              <Text style={styles.titulo}>
                Colegio
              </Text>
              <Text style={styles.texto}>
                {contratoInfo.colegio.trim()}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", }}>
              <Text style={styles.titulo}>
                Quincena
              </Text>
              <Text style={styles.texto}>
                {contratoInfo.periodo.trim()} {contratoInfo.año.trim()}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", }}>
              <Text style={styles.titulo}>
                Destino
              </Text>
              <Text style={styles.texto}>
                {contratoInfo.destino.trim()}
              </Text>
            </View>
            <TouchableOpacity onPress={()=>{select(contratoInfo.num)}}  style={{ width: 320, height: 40, borderRadius: 10, borderWidth: 1, borderColor: "#334EA2", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
              <Text style={{ color: "#334EA2", fontWeight: "600", fontSize: 12, lineHeight: 14, textAlign: "center" }}>
                Seleccionar
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{ width: 320, height: 40, borderRadius: 10, borderWidth: 1, borderColor: "#FF6363", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
              <Text style={{color:"#FF6363", fontWeight:"600", fontSize:12, lineHeight:14, textAlign:"center"}}>
                Desasociar contrato
              </Text>
            </TouchableOpacity> */}
          </View>
          :
          null
      }
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  texto: {
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 21,
    marginLeft: 10
  },
  titulo: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 21
  }
})