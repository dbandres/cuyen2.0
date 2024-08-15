import { useRef } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, findNodeHandle } from "react-native";
import HeaderSection  from "../components/HeaderSection";
import { PromosVigentes } from "./PromosVigente";
import { InfoImportante } from "./InfoImportante";
import { FormContact } from "./FormContact";
import { Footer } from "./Footer";
import { ButtomTabs } from "./ButtomTabs";

const Width = Dimensions.get("screen").width
const Height = Dimensions.get("window").height

export function Intro({ navigation }) {


  const contactoRef = useRef();
  const scrollViewRef = useRef();

  const scrollToContacto = () => {
    if (contactoRef.current) {
      contactoRef.current.measureLayout(
        findNodeHandle(scrollViewRef.current),
        (x, y) => {
          scrollViewRef.current.scrollTo({ y, animated: true });
        }
      );
    }
  }

  return (
    <SafeAreaView style={styles.constainer}>
      <ScrollView ref={scrollViewRef} style={{ width: "100%" }}>
        <HeaderSection scrollToContacto={scrollToContacto}></HeaderSection>
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
        <View style={{height:150}}>
          <Footer/>
        </View>
      </ScrollView>
      <ButtomTabs navigation={navigation}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "#CDD1DF",
  },
})