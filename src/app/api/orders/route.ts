import { NextResponse } from 'next/server';
import type { OrderPayload, OrderResponse, ValidationError } from '@/types/checkout';
import { isValidDutchPhoneNumber, isValidDutchPostcode, isValidEmail } from '@/utils/validation';

function validateOrder(payload: OrderPayload): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!payload.personal.firstName) {
    errors.push({ field: 'personal.firstName', message: 'Voornaam is verplicht.' });
  }

  if (!payload.personal.lastName) {
    errors.push({ field: 'personal.lastName', message: 'Achternaam is verplicht.' });
  }

  if (!payload.personal.email) {
    errors.push({ field: 'personal.email', message: 'E-mailadres is verplicht.' });
  } else if (!isValidEmail(payload.personal.email)) {
    errors.push({
      field: 'personal.email',
      message: 'Voer een geldig e-mailadres in.'
    });
  }

  if (!payload.personal.phone) {
    errors.push({ field: 'personal.phone', message: 'Telefoonnummer is verplicht.' });
  } else if (!isValidDutchPhoneNumber(payload.personal.phone)) {
    errors.push({
      field: 'personal.phone',
      message: 'Voer een geldig Nederlands telefoonnummer in.'
    });
  }

  if (!payload.address.street) {
    errors.push({ field: 'address.street', message: 'Straat is verplicht.' });
  }

  if (!payload.address.houseNumber) {
    errors.push({
      field: 'address.houseNumber',
      message: 'Huisnummer is verplicht.'
    });
  }

  if (!payload.address.postalCode) {
    errors.push({
      field: 'address.postalCode',
      message: 'Postcode is verplicht.'
    });
  } else if (!isValidDutchPostcode(payload.address.postalCode)) {
    errors.push({
      field: 'address.postalCode',
      message: 'Voer een geldige Nederlandse postcode in (bijv. 1234AB).'
    });
  }

  if (!payload.address.city) {
    errors.push({ field: 'address.city', message: 'Plaats is verplicht.' });
  }

  if (!payload.paymentMethod) {
    errors.push({
      field: 'paymentMethod',
      message: 'Kies een betaalmethode.'
    });
  }

  if (payload.paymentMethod === 'creditcard') {
    if (!payload.creditCard) {
      errors.push({
        field: 'creditCard',
        message: 'Creditcardgegevens zijn verplicht bij deze betaalmethode.'
      });
    } else {
      if (!payload.creditCard.cardNumber) {
        errors.push({
          field: 'creditCard.cardNumber',
          message: 'Kaartnummer is verplicht.'
        });
      }

      if (!payload.creditCard.cardholderName) {
        errors.push({
          field: 'creditCard.cardholderName',
          message: 'Naam kaarthouder is verplicht.'
        });
      }

      if (!payload.creditCard.expiryMonth || !payload.creditCard.expiryYear) {
        errors.push({
          field: 'creditCard.expiry',
          message: 'Vervaldatum is verplicht.'
        });
      }

      if (!payload.creditCard.cvc) {
        errors.push({
          field: 'creditCard.cvc',
          message: 'CVC is verplicht.'
        });
      }
    }
  }

  if (!payload.cart || !payload.cart.items || payload.cart.items.length === 0) {
    errors.push({
      field: 'cart',
      message: 'De winkelwagen mag niet leeg zijn.'
    });
  }

  return errors;
}

export async function POST(request: Request) {
  let payload: OrderPayload;

  try {
    payload = (await request.json()) as OrderPayload;
  } catch {
    const response: OrderResponse = {
      success: false,
      errors: [
        {
          field: 'root',
          message: 'Ongeldige JSON in verzoek.'
        }
      ]
    };

    return NextResponse.json(response, { status: 400 });
  }

  const errors = validateOrder(payload);

  if (errors.length > 0) {
    const response: OrderResponse = {
      success: false,
      errors
    };

    return NextResponse.json(response, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response: OrderResponse = {
    success: true,
    orderId: `ORDER-${Math.floor(Math.random() * 10_000_000)
      .toString()
      .padStart(7, '0')}`
  };

  return NextResponse.json(response, { status: 201 });
}
