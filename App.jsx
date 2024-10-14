/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { UserProvider } from './src/context/UserContext';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import { token } from './src/api';


function App() {

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [currentVersion, setCurrentVersion] = useState(null);

  const abrirLink = (linkUrl) => {
    const url = linkUrl;
    Linking.openURL(url)
      .catch((err) => console.error('Error al abrir el enlace:', err));
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://www.turismocuyen.com.ar/version/3', {
        headers: {
          'x-access-token': `${token}`,
          'Content-Type': 'application/json',
        }
      });
      if(response.status === 200){
        setResult(response.data);
      }
    } catch (error) {
      setError(error.message);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    fetchData()

    let current = DeviceInfo.getVersion()
    setCurrentVersion(current)
    console.log("Version! ", current);
  }, [])

  // Lógica de comprobación de la versión
  useEffect(() => {
    if (result && currentVersion) {
      // Aquí puedes realizar cualquier comprobación con la versión obtenida y el resultado
      console.log("Versión obtenida:", result.version);

      if (result.version == currentVersion) {
        setLoading(false)
      } else {
        setLoading(false)
        setError({
          texto: "Existe una nueva versión, actualizala para poder disfrutar de la aplicacion al 100%",
          url: result.url
        })
      }

    }
  }, [result, currentVersion]);

  const renderAlertError = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#D2DCEB" }}>
        <View style={{ width: "90%", height: 300, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
          <View style={{ width: "90%", alignItems: "center", justifyContent: "center", height: 90 }}>
            <Text style={{ fontWeight: "800", fontSize: 16, lineHeight: 18, color: "#564C71", textAlign: "center" }}>
              {error.texto}
            </Text>
          </View>
          <TouchableOpacity onPress={() => { abrirLink(error.url) }} style={{ width: 331, height: 47, backgroundColor: "#FF3D00", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "white", fontWeight: "600", fontSize: 14, lineHeight: 14 }}>
              Actualizar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <Provider store={store}>
      <UserProvider>
        <AuthProvider>
          <NavigationContainer>
            {/* {
              loading === true ?
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#D2DCEB" }}>
                  <ActivityIndicator size="large" color="#FF3D00" />
                  <View style={{ height: 50, justifyContent: "center", alignItems: "center", width: "90%" }}>
                    <Text style={{ fontWeight: "800", fontSize: 16, lineHeight: 18, color: "#564C71", textAlign: "center" }}>
                      Estamos comprobando la version de la aplicación.
                    </Text>
                  </View>
                </View> */}
                {/* : error !== null ?
                  renderAlertError()
                  : */}
                  <AuthNavigator />
            {/* } */}
          </NavigationContainer>
        </AuthProvider>
      </UserProvider>
    </Provider>

  );
}

export default App;
