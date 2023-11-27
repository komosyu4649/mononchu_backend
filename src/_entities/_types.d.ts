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
  memos: StuffMemoProperty[];
}

export interface StuffWant {
  id: number;
  name: string;
  thumbnail?: string;
  score?: number;
  price?: number;
  brand?: string;
  url?: string;
  conditions?: {
    asset: string;
    period: string;
    property: number;
  };
}

export interface StuffWantConditions {
  id: number;
  asset: string;
  period: string;
  property: number;
  want: StuffWant;
}

export interface StuffMemo {
  id: number;
  fiveW: string[];
  image: string;
  memo: string;
}

export interface AssetProperty {
  id: number;
  name: string;
  price: number;
  registrationNumber: number;
  category: StuffCategory;
}
