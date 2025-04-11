"use client";
import { createContext, useContext, useState } from "react";

type FacilityContextType = {
  selectedFacility: string;
  setSelectedFacility: (name: string) => void;
};

const FacilityContext = createContext<FacilityContextType>({
  selectedFacility: "Room 103.B11",
  setSelectedFacility: () => {} 
});

export function FacilityProvider({ children }: { children: React.ReactNode }) {
  const [selectedFacility, setSelectedFacility] = useState("Room 103.B11");

  return (
    <FacilityContext.Provider value={{ selectedFacility, setSelectedFacility }}>
      {children}
    </FacilityContext.Provider>
  );
}

export const useFacility = () => useContext(FacilityContext);
