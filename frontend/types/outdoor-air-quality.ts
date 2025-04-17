export interface AirQualityResponse {
  current: {
    pm2_5: number;
    pm10: number;
    sulphur_dioxide: number;
    nitrogen_dioxide: number;
    ozone: number;
    time: bigint;
    carbon_monoxide: number;
    us_aqi: number;
  };
}

export interface AirQualityData {
  time: Date;
  pm2_5: number;
  pm10: number;
  sulphur_dioxide: number;
  nitrogen_dioxide: number;
  ozone: number;
  carbon_monoxide: number;
  us_aqi: number;
}
