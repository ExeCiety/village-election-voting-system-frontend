export type formOfficerLoginStateType = {
  username: string
  password: string
}

export type formOfficerLoginUiStateType = {
  showPassword: boolean
  isButtonLoading: boolean
  disabledInputs: {
    username: boolean
    password: boolean
  }
  error: string
  errors: {
    username: string
    password: string
  }
}

export type formVoterLoginStateType = {
  token: string
}

export type formVoterLoginUiStateType = {
  isButtonLoading: boolean
  disabledInputs: {
    token: boolean
  }
  error: string
  errors: {
    token: string
  }
}