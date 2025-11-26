const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Eenvoudige validatie voor Nederlandse telefoonnummers (beginnend met 0 of +31)
const DUTCH_PHONE_REGEX = /^(?:\+31|0)(?:[1-9][0-9])?[0-9]{7,8}$/;

// Formaat: 1234AB (met of zonder spatie)
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

// Eenvoudige helpers voor creditcardvelden.
// Kandidaten mogen deze gebruiken of eigen validatie implementeren.

export function isNonEmpty(value: string | null | undefined): boolean {
  return !!value && value.trim().length > 0;
}
