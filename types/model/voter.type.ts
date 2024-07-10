import type { Session } from './session.type'

export type Voter = {
  id: string
  nik: string
  full_name: string
  birthdate: string
  address: string
  gender: string
  otp: string
  otp_status: boolean
}

export type VoterResponse = Voter & {
  session: Session
}

export type FormState = {
  id: string
  session_id: string
  nik: string
  full_name: string
  birthdate: string
  address: string
  gender: 'Male' | 'Female'
}

export type FormUiState = {
  disabledInputs: {
    button: boolean
    session_id: boolean
    nik: boolean
    full_name: boolean
    birthdate: boolean
    address: boolean
    gender: boolean
  }
  error: string
  errors: {
    session_id: string
    nik: string
    full_name: string
    birthdate: string
    address: string
    gender: string
  }
}
