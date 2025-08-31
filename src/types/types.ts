// Contact type
export interface Contact {
  id: string
  userId: string
  name: string
  phone: string
  email: string
  relation: string
}

// Account type
export interface Account {
  id: string
  userId: string
  type: "EPARGNE" | "COURANT" | "NDJANGUI" | "CHEQUE" | "PLACEMENT"
  balance: string
  rib: string | null
  active: boolean
  createdAt: string
  updatedAt: string
}

// Document type
export interface Document {
  id: string
  userId: string
  type: string
  frontImage: string | null
  backImage: string | null
}

// Verification type
export interface Verification {
  id: string
  userId: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  verifiedBy: string | null
  verifiedAt: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
}

// Profile type
export interface Profile {
  id: string
  userId: string
  firstName: string
  lastName: string
  birthDate: string
  birthPlace: string
  nationality: string
  resident: string
  ppe: string
  idNumber: string
  idIssuer: string
  idDate: string
  phone: string
  address: string
  city: string
  profession: string
  employer: string
  maritalStatus: string
  children: number
  salary: string
  signature: string
  termsAccepted: boolean
}

// Main User type
export interface User {
    id: string
    email: string
    username: string | null
    roleType: "ADMIN" | "USER" // extend if more roles exist
    createdAt: string
    updatedAt: string
    profile: Profile
    contacts: Contact[]
    accounts: Account[]
    documents: Document
    verification: Verification

}
