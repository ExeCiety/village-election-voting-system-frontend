import type { TableColumns } from '~/types/model/table.type'
import type { VoterResponse } from '~/types/model/voter.type'

export const columns: TableColumns[] = [
  {
    key: 'no',
    label: 'No',
    sortable: true
  },
  {
    key: 'session_name',
    label: 'Nama Sesi Pemilihan'
  },
  {
    key: 'nik',
    label: 'NIK'
  },
  {
    key: 'name',
    label: 'Nama Pemilih',
    sortable: true,
    direction: 'asc' as const
  },
  {
    key: 'birthdate',
    label: 'Tanggal Lahir',
    sortable: true
  },
  {
    key: 'otp',
    label: 'OTP'
  },
  {
    key: 'otp_status',
    label: 'OTP Status'
  },
  {
    key: 'action',
    label: 'Aksi'
  }
]

export const voters: VoterResponse[] = [
  {
    id: 'ef9e0952-1b0c-424f-92d3-574876683f0e',
    nik: '3217271001566867',
    name: 'Vero Mandala',
    birthdate: '1981-10-09',
    address: 'Jl. Pegangsaan Timur No. 56, Jakarta',
    gender: 'male',
    otp: '87401235',
    otp_status: false,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '027f8fd8-11b7-49fe-801b-22a80dca2e4d',
    nik: '3217428418712278',
    name: 'Tgk. Balidin Bungsu',
    birthdate: '1978-04-17',
    address: 'Jl. Panglima Polim No. 10, Jakarta',
    gender: 'male',
    otp: '31720548',
    otp_status: false,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '78fe123c-5962-4e3d-b053-3e3d65f32683',
    nik: '3217077240916465',
    name: 'Lina Permata Sari',
    birthdate: '1992-07-24',
    address: 'Jl. Kebon Kacang No. 32, Jakarta',
    gender: 'female',
    otp: '89037512',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '50bfbdd2-74af-47fd-98ed-dfacc2d22b56',
    nik: '3217292960994473',
    name: 'Dani Wijaya',
    birthdate: '1985-09-29',
    address: 'Jl. Setiabudi Barat No. 15, Jakarta',
    gender: 'male',
    otp: '12674039',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'bd222671-73db-4f58-ad49-7dc80836d5fb',
    nik: '3217176829922001',
    name: 'Siti Rahmawati',
    birthdate: '1976-12-31',
    address: 'Jl. Merdeka Timur No. 12, Jakarta',
    gender: 'female',
    otp: '23579810',
    otp_status: false,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '5f0de73b-f83e-43e1-b098-11ce9209b982',
    nik: '3217880569362825',
    name: 'Agus Pramono',
    birthdate: '1988-05-06',
    address: 'Jl. Thamrin No. 43, Jakarta',
    gender: 'male',
    otp: '97035126',
    otp_status: false,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'ba950531-77ba-4cc4-b8e0-25cea55f6166',
    nik: '3217305376411429',
    name: 'Budi Santoso',
    birthdate: '1975-07-30',
    address: 'Jl. Sudirman No. 54, Jakarta',
    gender: 'male',
    otp: '26309847',
    otp_status: false,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '40714d4a-62de-404f-920a-d3e1e3c88a29',
    nik: '3217621454841248',
    name: 'Dewi Kusuma',
    birthdate: '1982-12-14',
    address: 'Jl. Kuningan No. 23, Jakarta',
    gender: 'female',
    otp: '80451297',
    otp_status: false,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'a1969279-b0b5-42df-abc7-80af8229521a',
    nik: '3217817813099057',
    name: 'Indra Lesmana',
    birthdate: '1981-07-18',
    address: 'Jl. Sabang No. 19, Jakarta',
    gender: 'male',
    otp: '42198673',
    otp_status: false,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'd1d9ea98-34ba-45dc-8d79-ed3af27e009b',
    nik: '3217727068897884',
    name: 'Rina Anggraini',
    birthdate: '1990-07-27',
    address: 'Jl. Salemba No. 4, Jakarta',
    gender: 'female',
    otp: '71036529',
    otp_status: false,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'b5eb7828-5bf5-4c34-89d5-57e42c758c25',
    nik: '3217642995082893',
    name: 'Yusuf Hadi',
    birthdate: '1976-04-29',
    address: 'Jl. Blora No. 2, Jakarta',
    gender: 'male',
    otp: '38572094',
    otp_status: false,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '3494ac91-4bcb-42cd-becd-76417ad090f8',
    nik: '3217742866965766',
    name: 'Fahmi Ramadhan',
    birthdate: '1988-04-28',
    address: 'Jl. Panglima Polim No. 1, Jakarta',
    gender: 'male',
    otp: '74213608',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '650720c7-57e7-44f2-b487-e4dc37bfa32f',
    nik: '3217969433374090',
    name: 'Maya Putri',
    birthdate: '1986-09-29',
    address: 'Jl. Buncit Raya No. 10, Jakarta',
    gender: 'female',
    otp: '81704963',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'cbff94d4-58eb-4a8c-a52f-e1a0f1339341',
    nik: '3217029627580009',
    name: 'Wahyu Nugroho',
    birthdate: '1975-02-15',
    address: 'Jl. Gunung Sahari No. 23, Jakarta',
    gender: 'male',
    otp: '63928471',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'e2a4e767-d14e-43fb-b63c-ba54cf11764b',
    nik: '3217915652698483',
    name: 'Rudi Hartono',
    birthdate: '1987-10-15',
    address: 'Jl. Kemang Timur No. 7, Jakarta',
    gender: 'male',
    otp: '58207439',
    otp_status: false,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'a7b60d3e-f6bd-4ce3-8111-c013f96ddad9',
    nik: '3217518794589893',
    name: 'Lala Kurnia',
    birthdate: '1980-05-22',
    address: 'Jl. Tebet Barat No. 19, Jakarta',
    gender: 'female',
    otp: '40789315',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '11d141a0-6846-4f03-a1c1-338b9efcb6ee',
    nik: '3217299724547809',
    name: 'Rizki Ramadhan',
    birthdate: '1990-12-01',
    address: 'Jl. Palem No. 3, Jakarta',
    gender: 'male',
    otp: '73840216',
    otp_status: false,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'a675e9a2-97c7-4644-aafe-d1cebb4e4634',
    nik: '3217636856413377',
    name: 'Desi Ayu',
    birthdate: '1975-06-23',
    address: 'Jl. Menteng No. 7, Jakarta',
    gender: 'female',
    otp: '18593724',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '171a6e01-5ab9-407c-aceb-85df87f0fd9b',
    nik: '3217580034811243',
    name: 'Adi Pratama',
    birthdate: '1978-05-14',
    address: 'Jl. Pramuka No. 13, Jakarta',
    gender: 'male',
    otp: '70984325',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '2e59c5cb-f1a5-458a-8639-b093077856b3',
    nik: '3217359036540658',
    name: 'Santi Wulandari',
    birthdate: '1992-05-03',
    address: 'Jl. Raya Bogor No. 11, Jakarta',
    gender: 'female',
    otp: '95317482',
    otp_status: false,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'e4e0186f-a0e6-4336-9f97-a972931f851b',
    nik: '3217079939960166',
    name: 'Dedi Susanto',
    birthdate: '1987-09-20',
    address: 'Jl. Margonda No. 6, Depok',
    gender: 'male',
    otp: '62147830',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'c6d2049d-89ba-497a-bfb8-df578523aa5d',
    nik: '3217312066097674',
    name: 'Lutfi Hakim',
    birthdate: '1986-12-31',
    address: 'Jl. Cikini No. 17, Jakarta',
    gender: 'male',
    otp: '47512863',
    otp_status: false,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '4936016b-cbd8-490f-8b2a-96836e884775',
    nik: '3217981789530376',
    name: 'Arifin Ramadhan',
    birthdate: '1978-11-20',
    address: 'Jl. Matraman No. 4, Jakarta',
    gender: 'male',
    otp: '51936728',
    otp_status: false,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '5f849c7a-7b36-4aa7-a26b-d1b0a97d7e82',
    nik: '3217556813744178',
    name: 'Retno Larasati',
    birthdate: '1975-11-12',
    address: 'Jl. Diponegoro No. 6, Jakarta',
    gender: 'female',
    otp: '39182564',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '471fdaaf-0c16-42ec-be49-4e8b9c25a037',
    nik: '3217023389062164',
    name: 'Samsul Bahri',
    birthdate: '1980-12-25',
    address: 'Jl. Kramat No. 8, Jakarta',
    gender: 'male',
    otp: '20871349',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'f0ad4c47-a019-4e44-8f03-d2d63d5fa88d',
    nik: '3217062402050010',
    name: 'Mochamad Bagus Valentino Mazid',
    birthdate: '2005-02-24',
    address: 'Kp. Sindangsari No.25',
    gender: 'male',
    otp: '51802682',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'fb9a26e1-2ffb-48e8-afa7-0df383fd53cc',
    nik: '3217789161527632',
    name: 'Fitri Handayani',
    birthdate: '1985-05-08',
    address: 'Jl. Wijaya Kusuma No. 18, Jakarta',
    gender: 'female',
    otp: '49281037',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '33214fbb-e507-4c51-9093-92a1cfd4c132',
    nik: '3217063328707828',
    name: 'Hari Purnomo',
    birthdate: '1978-11-16',
    address: 'Jl. Tanjung Barat No. 5, Jakarta',
    gender: 'male',
    otp: '62879345',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '4ea30d64-0ce1-4968-b78a-0a912bbb2a03',
    nik: '3217990322027378',
    name: 'Susi Andayani',
    birthdate: '1982-02-27',
    address: 'Jl. Pangeran Antasari No. 3, Jakarta',
    gender: 'female',
    otp: '18329457',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'ed92da62-4095-4909-9577-346610e0367d',
    nik: '3217229641911518',
    name: 'Yuni Kurniasih',
    birthdate: '1987-09-02',
    address: 'Jl. Gajah Mada No. 20, Jakarta',
    gender: 'female',
    otp: '50619872',
    otp_status: true,
    session: {
      id: '1',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  }
]
