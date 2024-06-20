import type { TableColumns } from '~/types/model/table.type'
import type { Session } from '~/types/model/session.type'

export const tableColumns: TableColumns[] = [
  {
    key: 'no',
    label: 'No',
    sortable: true
  },
  {
    key: 'name',
    label: 'Nama',
    sortable: true
  },
  {
    key: 'start',
    label: 'Waktu Mulai',
    sortable: true
  },
  {
    key: 'end',
    label: 'Waktu Selesai',
    sortable: true
  },
  {
    key: 'action',
    label: 'Aksi'
  }
]


export const sessions: Session[] = [
  {
    id: '1',
    name: 'Pemilihan tahun 2014',
    start: '2024-02-10 07:00:00',
    end: '2024-02-10 20:00:00'
  },
  {
    id: '2',
    name: 'Pemilihan tahun 2019',
    start: '2024-02-10 07:00:00',
    end: '2024-02-10 18:00:00'
  },
  {
    id: '3',
    name: 'Pemilihan tahun 2024',
    start: '2024-02-10 07:00:00',
    end: '2024-02-10 13:00:00'
  }
]