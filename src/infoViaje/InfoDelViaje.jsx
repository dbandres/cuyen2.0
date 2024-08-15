import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";
import { Destino } from "./componentes/Destino";
import { Informacion } from "./componentes/Informacion";
import { Contingente } from "./componentes/Contingente";
import { Hotel } from "./componentes/Hotel";

export const InfoDelViaje = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          {/* Contenido del viaje */}
          <Header children="Informacion del viaje" navigation={navigation} />
          <Destino/>
          <Informacion/>
          <Contingente
            navigation={navigation}
          />
          <Hotel/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#D2DCEB",
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: "#D2DCEB",
  },
  container: {
    flex: 1,
    backgroundColor: "#D2DCEB",
    alignItems: "center",
  },
});
