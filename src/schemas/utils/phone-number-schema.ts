import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { z } from 'zod'
import { messages } from '@core/constants/messages'
import { STRICT_BR_PHONE_REGEX } from '@core/constants/regex-constants'

// specified phone format +55 61 98765-4321 or +55 11 8765-4321

export const phoneNumberSchema = z
  .string()
  .min(1, { message: messages.validation.invalidPhoneNumber })
  .superRefine((val, ctx) => {
    if (!STRICT_BR_PHONE_REGEX.test(val)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Formato esperado: +55 XX XXXXX-XXXX ou +55 XX XXXX-XXXX',
      })
      return
    }

    const phone = parsePhoneNumberFromString(val, 'BR')
    if (!phone?.isValid()) {
      ctx.addIssue({
        code: 'custom',
        message: messages.validation.invalidPhoneNumber,
      })
    }
  })
