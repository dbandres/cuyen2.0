import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export function DetalleInfoContrato({InfoContrato}) {
  
  return (
    <View style={{ width: width*0.8, height: 180}}>
      <View style={{marginBottom:5, display:"flex", flexDirection:"row"}}>
        <Text style={styles.title}>
          Colegio
        </Text>
        <Text style={styles.descrip}>
          {InfoContrato[0]. colegio}
        </Text>
      </View>
      <View style={{marginBottom:5, display:"flex", flexDirection:"row"}}>
        <Text style={styles.title}>
          Curso
        </Text>
        <Text style={styles.descrip}>
          {InfoContrato[0]. curso}
        </Text>
      </View>
      <View style={{marginBottom:5, display:"flex", flexDirection:"row"}}>
        <Text style={styles.title}>
          Contrato
        </Text>
        <Text style={styles.descrip}>
          {InfoContrato[0]. num}
        </Text>
      </View>
      <View style={{marginBottom:5, display:"flex", flexDirection:"row"}}>
        <Text style={styles.title}>
          Destino
        </Text>
        <Text style={styles.descrip}>
          {InfoContrato[0]. destino}
        </Text>
      </View>
      <View style={{marginBottom:5, display:"flex", flexDirection:"row"}}>
        <Text style={styles.title}>
          Quincena
        </Text>
        <Text style={styles.descrip}>
        {InfoContrato[0].periodo.trim()} - {InfoContrato[0].mes}
        </Text>
      </View>
      <View style={{marginBottom:5, display:"flex", flexDirection:"row"}}>
        <Text style={styles.title}>
          Cantidad de dias
        </Text>
        <Text style={styles.descrip}>
          {InfoContrato[0]. duracion}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
	title: {
		color:"#949AAF",
    fontWeight:"400",
    fontSize:12,
    lineHeight:25
	},
  descrip:{
    color:"#949AAF",
    fontWeight:"700",
    fontSize:12,
    lineHeight:25,
    marginLeft:5
  }
})