export interface StuffCategory {
  id: number;
  rank?: number;
  name: string;
  icon: string;
  propertyLimitedNumber: number;
  propertyRegistrationNumber?: number;
  wantRegistrationNumber?: number;
  wantTotalAmount?: number;
}

export interface StuffProperty {
  id: number;
  name: string;
  thumbnail?: strgin;
  score?: number;
  price?: number;
  address?: string;
  purchaseDate?: string;
  purchasePlace?: string;
}
