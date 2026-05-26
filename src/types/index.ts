export interface University {
  id: string;
  name: string;
  country: string;
  ranking?: string;
  imageUrl: string;
  isTopUniversity: boolean;
  scholarshipsAvailable: boolean;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  destinationCountry: string;
  message?: string;
}