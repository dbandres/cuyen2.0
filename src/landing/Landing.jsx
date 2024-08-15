import { useContext, useRef } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, findNodeHandle } from "react-native"
import { UserContext } from "../context/UserContext";
import { HeaderLanding } from "./HeaderLanding";
import { PromosVigentes } from "../intoScreen/PromosVigente";
import { InfoImportante } from "../intoScreen/InfoImportante";
import { FormContact } from "../intoScreen/FormContact";
import { Footer } from "../intoScreen/Footer";

const Width = Dimensions.get("screen").width
const Height = Dimensions.get("window").height

export default function Landing({ navigation }) {
  
  const contactoRef = useRef();
  const scrollViewRef = useRef();

  const scrollToContacto = () => {
    if (contactoRef.current) {
      setTimeout(() => {
        contactoRef.current.measureLayout(
          findNodeHandle(scrollViewRef.current),
          (x, y) => {
            scrollViewRef.current.scrollTo({ y, animated: true });
          }
        );
      }, 100);
    }
  }
  const openDrawer = () => {
    navigation.openDrawer();
  };



  return (
    <SafeAreaView style={styles.constainer}>
    <ScrollView ref={scrollViewRef} style={{ width: "100%" }}>
    <HeaderLanding openDrawer={openDrawer} scrollToContacto={scrollToContacto} />
      <View style={{ alignItems: "center", }}>
        <View style={{ width: "82%", justifyContent: "flex-start", display: "flex", flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14, marginRight: 4, color: "#564C71" }}>Promos</Text>
          <Text style={{ fontSize: 14, color: "#564C71" }}>vigentes</Text>
        </View>
      </View>
      <View style={{ height: 381, justifyContent: "center", alignItems: "center" }}>
        <PromosVigentes navigation={navigation} />
      </View>
      <View style={{ alignItems: "center", paddingTop: 10 }}>
        <View style={{ width: "82%", justifyContent: "flex-start", display: "flex", flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14, marginRight: 4, color: "#564C71" }}>Info</Text>
          <Text style={{ fontSize: 14, color: "#564C71" }}>importante</Text>
        </View>
      </View>
      <View style={{ height: 381, justifyContent:"center", alignItems:"center" }}>
        <InfoImportante/>
      </View>
      <FormContact ref={contactoRef}/>
      <View style={{height:450}}>
        <Footer/>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "#CDD1DF",
  },
})