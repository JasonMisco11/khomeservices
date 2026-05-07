import { Models } from "node-appwrite";

export interface User extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  gender?: Gender;
  address?: string;
  identificationType: string;
  identificationNumber: string;
  privacyConsent: boolean;
}

export interface Appointment extends Models.Document {
  user: string;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}
