export type TableColumns = {
  label?: string
  key?: string
  sortable?: boolean
  direction?: 'asc' | 'desc'
}

export type TableProps = {
  data: any[]
  columns: TableColumns[]
}