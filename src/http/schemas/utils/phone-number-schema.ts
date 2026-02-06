import { messages } from '@constants/messages'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { z } from 'zod'

// specified phone format +55 61 98765-4321 or +55 11 8765-4321

const STRICT_BR_PHONE_REGEX = /^\+55 \d{2} (9\d{4}|\d{4})-\d{4}$/

export const phoneNumberSchema = z
  .string()
  .regex(STRICT_BR_PHONE_REGEX, {
    message: messages.validation.invalidPhoneNumber,
  })
  .refine(
    (val) => {
      const phone = parsePhoneNumberFromString(val, 'BR')
      return phone?.isValid() ?? false
    },
    {
      message: messages.validation.invalidPhoneNumber,
    },
  )
