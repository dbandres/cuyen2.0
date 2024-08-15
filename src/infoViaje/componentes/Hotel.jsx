import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, Animated, Dimensions, Platform, ActivityIndicator } from "react-native"
import { InfoContext } from "../InfoContext";
import { clearStateHotel, getHotelByNum } from "../../slices/getHotelByNumSlice";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useFocusEffect } from "@react-navigation/native";


const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export function Hotel() {

  const dispatch = useDispatch()

  const [isExpanded, setIsExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(88));
  const [imgArray, setImgArray] = useState("")

  const { miInfo } = useContext(InfoContext)
  const contentRef = useRef(null);

  const hotel = useSelector((state) => state.hotelByNum.hotel)
  const loading = useSelector((state) => state.hotelByNum.loading)

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
          toValue: 850, // Ajusta según tus necesidades
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
      console.log('Pantalla enfocada Hotel. Puedes ejecutar operaciones aquí.', miInfo.hotelId);
      if (miInfo.hotelId !== "") {
        dispatch(getHotelByNum(miInfo.hotelId))
      }
      // Puedes realizar otras operaciones aquí, como cargar datos, etc.
      return () => {
        // Este código se ejecuta cuando el componente se desenfoca o se desmonta
        console.log('Pantalla desenfocada Hotel. Limpieza o desmontaje aquí.');
        //  setNewValue('')
        dispatch(clearStateHotel())
        setIsExpanded(false)
      };
    }, [miInfo]))

  useEffect(() => {
    if (hotel.length !== 0) {
      const imagenes = JSON.parse(hotel.fotos)
      setImgArray(imagenes)
    }
  }, [hotel])

  return (
    <Animated.View ref={contentRef} style={{ height: heightAnim, width: width * 0.9, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center", marginBottom: 10 }}>
      <TouchableOpacity onPress={toggleExpand} disabled={hotel.length !== 0 ? false : true} style={{ width: width * 0.8, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: isExpanded ? 91 : "100%" }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: hotel.length !== 0 ? "#FF3D00" : "#D2DCEB", alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require('../../assets/hotel_blanco.png')}
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
                  Hotel
                </Text>
                {
                  hotel.length !== 0 ?
                    <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
                      {hotel.nombre}
                    </Text>
                    :
                    <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
                      Informacion no disponible
                    </Text>
                }
              </View>
          }
        </View>
        <View>
          <View>
            {
              hotel.length !== 0 ?
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
        isExpanded === true ?
          <>
            <View style={{ height: 220 }}>
              <MapView
                provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE}
                style={{ height: 200, width: width * 0.9, }}
                initialRegion={{
                  latitude: JSON.parse(hotel.latitude),
                  longitude: JSON.parse(hotel.longitude),
                  latitudeDelta: 0.02, // Utilizar el nivel de zoom actual
                  longitudeDelta: 0.02,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: JSON.parse(hotel.latitude),
                    longitude: JSON.parse(hotel.longitude),
                  }}
                  image={require('../../assets/marker.png')}
                  style={{ height: 41, width: 68 }}
                />
              </MapView>
            </View>
            <View style={{ width: "90%", height: 160 }}>
              <View style={{ height: 50, justifyContent: "center" }}>
                <Text style={{ fontWeight: "800", fontSize: 14, lineHeight: 16, color: "#564C71" }}>
                  Hotel
                </Text>
                <Text style={{ fontWeight: "400", fontSize: 16, lineHeight: 19, color: "#564C71" }}>
                  {hotel.nombre}
                </Text>
              </View>
              <View style={{ height: 50, justifyContent: "center" }}>
                <Text style={{ fontWeight: "800", fontSize: 14, lineHeight: 16, color: "#564C71" }}>
                  Dirección
                </Text>
                <Text style={{ fontWeight: "400", fontSize: 16, lineHeight: 19, color: "#564C71" }}>
                  {hotel.direccion}
                </Text>
              </View>
              <View style={{ height: 50, justifyContent: "center" }}>
                <Text style={{ fontWeight: "800", fontSize: 14, lineHeight: 16, color: "#564C71" }}>
                  Teléfono
                </Text>
                <Text style={{ fontWeight: "400", fontSize: 16, lineHeight: 19, color: "#564C71" }}>
                  {hotel.telefono}
                </Text>
              </View>
            </View>
            <View style={{ width: "98%", height: 350, flexDirection: 'column' }}>
              {
                <View style={{ marginBottom: 15, width: '100%', height: 200 }}>
                  <Image
                    source={{ uri: imgArray[0] }}
                    style={{
                      width: "100%",
                      height: 200,
                      resizeMode: 'cover'
                    }}
                  />
                </View>
              }
              <View style={{ width: "98%", height: 150, flexDirection: 'row' }}>
                {
                  imgArray.slice(1, 4).map((foto, index) => (
                    <View key={index} style={{ width: '33%', height: 125, marginRight: 5, backgroundColor: "red" }}>
                      <Image
                        source={{ uri: foto }}
                        style={{
                          width: "100%",
                          height: 125,
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                  ))
                }
              </View>
            </View>
          </>
          : null
      }
    </Animated.View>
  )
}