export type Day = {
  date: Date;
  price: number;
  label?: string;
};
export type SlotStatus = 'free' | 'selected' | 'booked';

export type Slot = {
  date: Date;
  price: number;
  status: SlotStatus;
};
