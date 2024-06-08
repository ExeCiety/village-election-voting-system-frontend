export type Voter = {
  id: string
  nik: string
  name: string
  birthdate: string
  address: string
  gender: 'male' | 'female'
  otp: string
  otp_status: boolean
}

export type CreateVoterState = {
  nik: string
  name: string
  birthdate: Date
  address: string
  gender: string
}

export type CreateVoterUiState = {
  disabledInputs: {
    button: boolean
    nik: boolean
    name: boolean
    birthdate: boolean
    address: boolean
    gender: boolean
  }
  error: string
  errors: {
    nik: string
    name: string
    birthdate: string
    address: string
    gender: string
  }
}