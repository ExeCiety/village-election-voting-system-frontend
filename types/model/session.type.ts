export type Session = {
  id: string
  name: string
  start: string
  end: string
}

export type FormState = {
  name: string
  start: string
  end: string
}

export type FormUiState = {
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
