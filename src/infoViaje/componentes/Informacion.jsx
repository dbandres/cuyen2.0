import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, Animated, Dimensions, ActivityIndicator } from "react-native"
import { UserContext } from "../../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { getContrato } from "../../slices/getContratoSlice";
import { DetalleInfoContrato } from "./DetalleInfoContrato";
import { useFocusEffect } from "@react-navigation/native";

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export function Informacion() {

  const [isExpanded, setIsExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(88));

  const contrato = useSelector((state) => state.contrato.contrato)
  const error = useSelector((state) => state.contrato.error)
  const loading = useSelector((state) => state.contrato.loading)

  const numeroContrato = useSelector((state) => state.contratoActual.numero);
  const dispatch = useDispatch()

  const { userdata } = useContext(UserContext)
  const contentRef = useRef(null);

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
        toValue: height * 0.1, // Altura mínima
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

  useFocusEffect(
    useCallback(() => {
      console.log('Pantalla enfocada Informacion. Puedes ejecutar operaciones aquí.', numeroContrato);
      dispatch(getContrato([numeroContrato]))
      // Puedes realizar otras operaciones aquí, como cargar datos, etc.
      return () => {
        // Este código se ejecuta cuando el componente se desenfoca o se desmonta
        console.log('Pantalla desenfocada. Limpieza o desmontaje aquí.');
        //  setNewValue('')
        setIsExpanded(false)
      };
    }, [numeroContrato]))

  return (
    <Animated.View ref={contentRef} style={{ height: heightAnim, width: width * 0.9, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center" }}>
      <TouchableOpacity onPress={toggleExpand} style={{ width: width * 0.8, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: isExpanded ? 91 : "100%" }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: contrato.length !== 0 ? "#FF3D00" : "#D2DCEB", alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require('../../assets/contract_white.png')}
              style={{ width: 24, height: 24 }}
            />
          </View>
          {
            loading === true ?
              <View style={{ width: '65%', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator
                  size='large'
                  color='#FF3D00'
                />
              </View>
              :
              <View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center", }}>
                <Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
                  Informacion
                </Text>
                <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
                  Contrato
                </Text>
              </View>
          }
        </View>
        <View>
          <View>
            {
              contrato.length !== 0 ?
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={toggleExpand}>
                  {/* Botón flecha */}
                  <Text>{isExpanded ? <Image source={require("../../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
                </TouchableOpacity>
                : null
            }
          </View>
        </View>
      </TouchableOpacity>
      {
        isExpanded &&
        <DetalleInfoContrato
          InfoContrato={contrato}
        />
      }
    </Animated.View>
  )
}