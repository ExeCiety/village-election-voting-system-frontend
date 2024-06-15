export type Session = {
  id: string
  name: string
  start: string
  end: string
}

export type SessionState = {
  name: string
  start: string
  end: string
}

export type SessionUiState = {
  disabledInputs: {
    button: boolean
    name: boolean
    start: boolean
    end: boolean
  }
  error: string
  errors: {
    name: string
    start: string
    end: string
  }
}
