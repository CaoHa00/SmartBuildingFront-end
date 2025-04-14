"use client";
import { createContext, useContext, useState, useEffect } from "react";

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

  useEffect(() => {
    const stored = localStorage.getItem('selectedFacility');
    if (stored) {
      setSelectedFacility(stored);
    }
  }, []);

  const handleSetSelectedFacility = (name: string) => {
    setSelectedFacility(name);
    localStorage.setItem('selectedFacility', name);
  };

  return (
    <FacilityContext.Provider value={{ selectedFacility, setSelectedFacility: handleSetSelectedFacility }}>
      {children}
    </FacilityContext.Provider>
  );
}

export const useFacility = () => useContext(FacilityContext);
