export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  imageUrl: string;
  whoApproved: boolean;
  avgFees: string;
  established: string;
  
  // Extra Details for Expanded View
  messIncluded: boolean;
  messCharges?: string;
  extraDetails?: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  destinationCountry: string;
  message?: string;
}