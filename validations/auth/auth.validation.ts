import { z, ZodType } from 'zod'

export const LOGIN_OFFICER: ZodType = z.object({
  username: z
    .string({
      required_error: "Oops, username can't be empty"
    })
    .min(3, {
      message: 'Oops, username must be at least 3 characters'
    }),
  password: z
    .string({
      required_error: "Oops, password can't be empty"
    })
    .min(8, {
      message: 'Oops, password must be at least 8 characters'
    })
})

export const LOGIN_VOTER: ZodType = z.object({
  token: z
    .string({
      required_error: "Oops, token can't be empty"
    })
    .min(8, {
      message: 'Oops, token must be at least 8 characters'
    })
})
