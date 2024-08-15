import React, { createContext, useState } from 'react';

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [miInfo, setMiInfo] = useState({
    numPasajero: [],
    hotelId: ""
  });



  return (
    <InfoContext.Provider value={{ miInfo, setMiInfo }}>
      {children}
    </InfoContext.Provider>
  )
};