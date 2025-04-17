export interface ElectricityData {
  current: number;
  forward_energy_power: number;
  active_power: number;
  voltage: number;
  timestamp: number;
}

export interface ElectricalValueProps {
  currentElectricalReading: number;
  totalElectricalReading: number;
}
