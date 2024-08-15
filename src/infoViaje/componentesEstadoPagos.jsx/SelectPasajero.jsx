import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { InfoContext } from "../InfoContext";

export const SelectPasajero = ({setControlSelect}) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(88));
  const [numPasajero, setNumPasajero] = useState(null)

  const pasajero = useSelector((state) => state.pasajero.pasajero)
  const { setMiInfo } = useContext(InfoContext)
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        Animated.timing(heightAnim, {
          toValue: pasajero.length * 35 + 100, // Ajusta según tus necesidades
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

  useEffect(()=>{
    if(pasajero.length === 1){
      setNumPasajero((prev)=>({
        ...prev,
        numPass: pasajero[0].numPas,
        pasajero: `${pasajero[0].nombre}, ${pasajero[0].apellido}`
      }))
    }else{
      console.log('es mas de un pasajero o ningun pasajero');
      setNumPasajero(null)
    }
  },[pasajero])

  const toggleExpand = () => {
    // Envía el índice del componente al padre para gestionar la expansión individual
    setIsExpanded(!isExpanded);
    setControlSelect(!isExpanded)
  };

  const selectNumPasajero = (value) =>{
    setNumPasajero((prev)=>({
      ...prev,
      numPass: value.numPas,
      pasajero: `${value.nombre}, ${value.apellido}`
    }))
    toggleExpand()
  }

  useEffect(() => {
    if (numPasajero !== null) {
      console.log(numPasajero.numPass, numPasajero.pasajero);
      // Función para cambiar el valor de numPasajero
        setMiInfo(prevState => ({
          ...prevState,
          numPasajero: numPasajero.numPass
        }))
    }

  }, [numPasajero])

  return (
    <Animated.View ref={contentRef} style={{ height: heightAnim, width: 373, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center" }}>
      <TouchableOpacity onPress={toggleExpand} style={{ width: 333, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: isExpanded ? 91 : "100%", }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: "#FF3D00", alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require('../../assets/contingente.png')}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center", }}>
            <Text style={{ color: "#564C71", fontWeight: "400", fontSize: numPasajero !== null ? 12 : 16, lineHeight: 19, marginBottom: 6 }}>
              {
                numPasajero !== null ? numPasajero.pasajero : 'Seleccione Pasajero'
              }
            </Text>
          </View>
        </View>
        <View>
          <View>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={toggleExpand}>
              {/* Botón flecha */}
              <Text>{isExpanded ? <Image source={require("../../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {
        isExpanded &&
        <>
          {
            pasajero ?
              pasajero.map((pas, index) => (
                <View key={index} style={{ height: 30, width: "95%", justifyContent: "center", alignItems: "center"}}>
                  <TouchableOpacity onPress={()=>{selectNumPasajero(pas)}} style={{ width: "100%", alignItems: "center", justifyContent: "space-between", display: "flex", flexDirection: "row"}}>
                    <Text style={{ fontWeight: "400", fontSize: 12, lineHeight: 14, color: "#564C71" }}>
                      {pas.nombre}, {pas.apellido}
                    </Text>
                  </TouchableOpacity>
                </View>
              )) : null
          }
        </>
      }
    </Animated.View>
  )
}