import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchInfo } from "../slices/infoImportante";


export function InfoImportante(){

  const dispatch = useDispatch();
  const info = useSelector((state) => state.info.info)
  const loading = useSelector((state) => state.info.loading);
  const error = useSelector((state) => state.info.error);

  useEffect(()=>{
    dispatch(fetchInfo())
  },[])


  return(
    <View>
      {
        info.length !== 0 ?
          <ScrollView
            horizontal={true}
            style>
            {
              info?.map((texto, index) => (
                <View key={index} style={{ height: 286, width: 320, backgroundColor: "white", margin: 14, borderRadius: 10 }}>
                  <View style={{ height: "30%", justifyContent: "center", margin: "5%" }}>
                    <Text style={{ fontSize: 20, fontWeight: "400", lineHeight: 24, color: "#564C71" }}>{texto.titulo}</Text>
                  </View>
                  <View style={{ height: "45%", justifyContent: "center", borderTopColor: "#162962", borderTopWidth: 3 }}>
                    <View style={{ margin: "5%" }}>
                      <Text style={{ fontWeight: "400", fontSize: 15, lineHeight: 18, color: "#564C71" }}>{texto.texto}</Text>
                    </View>
                  </View>
                </View>
              ))
            }
          </ScrollView>
          :
          <View style={{ alignItems: "center" }}>
            <View style={{ width: "82%", justifyContent: "flex-start", display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 14, marginRight: 4, color: "#564C71" }}>Cargando</Text>
              <Text style={{ fontSize: 14, color: "#564C71" }}>informacion</Text>
            </View>
          </View>
      }
    </View>
  )
}