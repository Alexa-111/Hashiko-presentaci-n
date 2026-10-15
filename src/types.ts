export type ScreenView = 'home' | 'auth' | 'vet-portal';

export interface PetAdoptionCandidate {
  id: string;
  name: string;
  breed: string;
  age: string;
  ageCategory: string;
  size: string;
  status: string;
  image: string;
  vaccinated: boolean;
  sterilized: boolean;
  traits: string[];
  description: string;
  sanctuary: string;
}

export interface LostPetAlert {
  id: string;
  name: string;
  breed: string;
  reward: string;
  location: string;
  collarDetails: string;
  image: string;
  timeAgo: string;
  alertedNeighbors: number;
  gpsActive: boolean;
  description: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  subtitle: string;
  image: string;
  category: string;
  badge?: string;
}

export interface CartItem {
  product: ShopProduct;
  quantity: number;
}

export interface Appointment {
  id: string;
  time: string;
  status: 'en_sala' | 'completada' | 'proxima' | 'pendiente';
  statusLabel: string;
  petName: string;
  species: string;
  age: string;
  image: string;
  box: string;
  ownerName: string;
  reason: string;
  notes?: string;
  badge?: string;
  attachments?: string[];
  completedSummary?: string;
}

export interface PatientVitals {
  petName: string;
  species: string;
  breed: string;
  gender: string;
  sterilized: boolean;
  microchip: string;
  image: string;
  currentWeight: string;
  weightDelta: string;
  vaccineStatus: string;
  vaccineNote: string;
  dewormingStatus: string;
  dewormingNote: string;
  criticalAlerts: string[];
  weightHistory: { month: string; weight: number }[];
  ownerName: string;
  ownerPhone: string;
}
