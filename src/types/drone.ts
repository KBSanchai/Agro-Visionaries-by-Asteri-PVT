
export type DronePosition = {
  x: number;
  y: number;
  altitude: number;
  rotation: number;
};

export type DroneGameState = {
  score: number;
  mission: string;
  batteryLevel: number;
  isCharging: boolean;
  fieldType: "rice" | "wheat" | "orchard" | "greenhouse" | "reservoir" | "none";
};
