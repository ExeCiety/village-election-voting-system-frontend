import { z, ZodType } from 'zod'

const dateRegex = /^\d{2}-\d{2}-\d{4}$/

export const CREATE: ZodType = z.object({
  nik: z
    .string({
      required_error: "Oops, NIK can' be empty"
    })
    .length(16, {
      message: 'Oops, NIK must be 16 characters'
    })
    .regex(/^[0-9]+$/, {
      message: 'Oops, NIK must be a number'
    }),
  name: z
    .string({
      required_error: "Oops, name can' be empty"
    })
    .min(1, {
      message: "Oops, name can't be empty"
    }),
  birthdate: z.coerce
    .date({
      required_error: "Oops, birthdate can' be empty"
    })
    .refine(
      (value) => {
        const today = new Date()
        const birthdate = new Date(value)
        let age = today.getFullYear() - birthdate.getFullYear()
        const month = today.getMonth() - birthdate.getMonth()

        if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate()))
          age--

        return age >= 17
      },
      {
        message: 'Oops, you must be at least 17 years old'
      }
    ),
  address: z
    .string({
      required_error: "Oops, address can' be empty"
    })
    .min(1, {
      message: "Oops, address can't be empty"
    }),
  gender: z.enum(['male', 'female'], {
    required_error: 'Oops, gender cannot be empty',
    invalid_type_error: 'Oops, gender must be either Male or Female'
  })
})
