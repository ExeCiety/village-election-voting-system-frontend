export type Session = {
  id: string
  name: string
  start_date: string
  end_date: string
}

export type FormState = {
  id: string
  name: string
  start_date: string
  end_date: string
}

export type DeleteIds = {
  ids: []
}

export type FormUiState = {
  disabledInputs: {
    button: boolean
    name: boolean
    start_date: boolean
    end_date: boolean
  }
  error: string
  errors: {
    name: string
    start_date: string
    end_date: string
  }
}
