export interface StuffCategory {
  rank: number;
  name: string;
  // property: StuffPropertyStatus;
  // want: StuffWantStatus;
}

export interface StuffPropertyStatus {
  registrationNumber: number;
  limitedNumber: number;
}

export interface StuffWantStatus {
  registrationNumber: number;
  totalAmount: number;
}
