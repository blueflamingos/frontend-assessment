const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DUTCH_PHONE_REGEX = /^(?:\+31|0)(?:[1-9][0-9])?[0-9]{7,8}$/;

const DUTCH_POSTCODE_REGEX = /^[1-9][0-9]{3}\s?[A-Za-z]{2}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export function isValidDutchPhoneNumber(value: string): boolean {
  return DUTCH_PHONE_REGEX.test(value.replace(/\s+/g, ''));
}

export function isValidDutchPostcode(value: string): boolean {
  return DUTCH_POSTCODE_REGEX.test(value.replace(/\s+/g, ''));
}

export function isNonEmpty(value: string | null | undefined): boolean {
  return !!value && value.trim().length > 0;
}
