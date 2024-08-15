import axios from "axios";
import { token } from "../api";

const uploadImages = (img, name, data, idUser) => {

  return new Promise((resolve, reject) => {
    const promises = img.map(image => {
      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: "image.png", // Cambia aquí si deseas mantener el nombre original de la imagen
      });

      return axios.post("https://www.turismocuyen.com.ar/spaces", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
    });

    Promise.all(promises)
      .then(responses => {
        const responsesArray = [];
        responses.forEach(res => {
          if (res.status === 200) {
            responsesArray.push(res.data);
            if (name === "Ficha medica") {
              const resp = axios.put(`/pasajero/${data}`, {
                ficha_med: res.data,
                loginId: idUser
              },
                {
                  headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json',
                  }
                })
              resp.then((res) => {
                console.log("esto es res: ", res);
              })
            }
            else if(name === "Declaración jurada") {
              const resp = axios.put(`/pasajero/${data}`, {
                dec_jurada: res.data,
                loginId: idUser
              },
                {
                  headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json',
                  }
                })
              resp.then((res) => {
                console.log("esto es res: ", res);
              })
            }
          }
        });
        if (name === "Carnet de obra social" && responsesArray.length === 2) {
          const resp = axios.put(`/pasajero/${data}`, {
            obra_soc: responsesArray,
            loginId: idUser
          },
            {
              headers: {
                'x-access-token': `${token}`,
                'Content-Type': 'application/json',
              }
            })
          resp.then((res) => {
            console.log("esto es res: ", res);
          })
        }
        else if (name === "Documento de identidad" && responsesArray.length === 2) {
          const resp = axios.put(`/pasajero/${data}`, {
            image_dni: responsesArray,
            loginId: idUser
          },
            {
              headers: {
                'x-access-token': `${token}`,
                'Content-Type': 'application/json',
              }
            })
          resp.then((res) => {
            console.log("esto es res: ", res);
          })
        }
        resolve(responsesArray);
        return;
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default uploadImages;