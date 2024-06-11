import type { Session } from './session.type'

export type VoterResponse = {
  id: string
  nik: string
  name: string
  birthdate: string
  address: string
  gender: 'male' | 'female'
  otp: string
  otp_status: boolean
  session: Session
}

export type VoterState = {
  session_id: string
  nik: string
  name: string
  birthdate: string
  address: string
  gender: string
}

export type VoterUiState = {
  disabledInputs: {
    button: boolean
    session_id: boolean
    nik: boolean
    name: boolean
    birthdate: boolean
    address: boolean
    gender: boolean
  }
  error: string
  errors: {
    session_id: string
    nik: string
    name: string
    birthdate: string
    address: string
    gender: string
  }
}
