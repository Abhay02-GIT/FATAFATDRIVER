import {MDI} from '@/constants/iconPaths';

export type VehicleId = 'cab' | 'auto' | 'bike' | 'scooty' | 'carpool' | 'parcel' | 'driver';

// Names are in strings.vehicles
export type Vehicle = {
  id: VehicleId;
  commission: number;
  iconPath: string;
  iconColor: string;
  tint: string;
};

// Order = order on screen (left to right, top to bottom)
export const VEHICLES: Vehicle[] = [
  {id: 'cab', commission: 20, iconPath: MDI.taxi, iconColor: '#FFC400', tint: '#FEF0EF'},
  {id: 'auto', commission: 15, iconPath: MDI.rickshawElectric, iconColor: '#F5A623', tint: '#FFF8E1'},
  {id: 'bike', commission: 10, iconPath: MDI.motorbike, iconColor: '#3FA9F5', tint: '#EAF3FF'},
  {id: 'scooty', commission: 10, iconPath: MDI.moped, iconColor: '#FF4D8D', tint: '#FFE8F0'},
  {id: 'carpool', commission: 12, iconPath: MDI.accountMultiple, iconColor: '#A64AC9', tint: '#F8EBFD'},
  {id: 'parcel', commission: 18, iconPath: MDI.truck, iconColor: '#F2683C', tint: '#FFF0E8'},
  {id: 'driver', commission: 20, iconPath: MDI.chauffeur, iconColor: '#FFA500', tint: '#FDF3E8'},
];
