export type LoginOfficerState = {
  username: string
  password: string
}

export type LoginOfficerUiStateType = {
  showPassword: boolean
  disabledInputs: {
    button: boolean
    username: boolean
    password: boolean
  }
  error: string
  errors: {
    username: string
    password: string
  }
}

export type LoginVoterStateType = {
  token: string
}

export type LoginVoterUiStateType = {
  disabledInputs: {
    button: boolean
    token: boolean
  }
  error: string
  errors: {
    token: string
  }
}