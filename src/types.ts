export type LeadStatus = 'new' | 'contacted' | 'interested' | 'not_interested';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  carInterest: string;
  status: LeadStatus;
  notes: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SalesPerson {
  id: string;
  name: string;
}