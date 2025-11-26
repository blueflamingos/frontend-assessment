import { NextResponse } from 'next/server';
import type { Cart } from '@/types/checkout';

const MOCK_CART: Cart = {
  currency: 'EUR',
  items: [
    {
      id: 'sku-001',
      name: 'Fictief product A',
      quantity: 1,
      unitPrice: 2999
    },
    {
      id: 'sku-002',
      name: 'Fictief product B',
      quantity: 2,
      unitPrice: 1599
    }
  ]
};

function toSerializableCart(cart: Cart): Cart {
  return {
    currency: cart.currency,
    items: cart.items
  };
}

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const cart = toSerializableCart(MOCK_CART);

  return NextResponse.json(cart);
}
