import useCurrentElectricalReading from './useCurrentElectricalReading';

interface CO2Value {
  co2Emissions: number;  // in kg
}

// CO2 emissions factor for electricity (kg CO2 per kWh)
// This is an average value, can be adjusted based on your local electricity grid
const CO2_FACTOR = 0.5;

export default function useCO2Emissions(): CO2Value | null {
  const currentReading = useCurrentElectricalReading();
  
  if (!currentReading) {
    return null;
  }

  // Convert kW to kg CO2 per hour
  const co2Emissions = (currentReading.electricalReading * CO2_FACTOR);
  
  return {
    co2Emissions
  };
}