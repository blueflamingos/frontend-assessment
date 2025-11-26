## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

## (mock) API documentatie

### GET `{localhost}/api/cart`

Haalt een fictieve winkelwagen op.

```json
{
  "currency": "EUR",
  "items": [
    {
      "id": "sku-001",
      "name": "Fictief product A",
      "quantity": 1,
      "unitPrice": 2999
    }
  ],
  "total": 2999
}
```

Prijzen zijn in centen (bijv. `2999` = €29,99).

### POST `{localhost}/api/orders`

Verwacht een payload met alle ingevulde gegevens en de cart. Bij een geldige payload wordt een order-id geretourneerd. Bij validatiefouten wordt een lijst met fouten geretourneerd.

**Voorbeeld payload**

```json
{
  "personal": {
    "firstName": "Jan",
    "lastName": "Jansen",
    "email": "jan@example.com",
    "phone": "0612345678"
  },
  "address": {
    "street": "Hoofdstraat",
    "houseNumber": "1A",
    "postalCode": "1234AB",
    "city": "Amsterdam"
  },
  "paymentMethod": "creditcard",
  "creditCard": {
    "cardNumber": "4111111111111111",
    "cardholderName": "Jan Jansen",
    "expiryMonth": "12",
    "expiryYear": "28",
    "cvc": "123"
  },
  "cart": {
    "currency": "EUR",
    "items": [
      {
        "id": "sku-001",
        "name": "Fictief product A",
        "quantity": 1,
        "unitPrice": 2999
      }
    ],
    "total": 2999
  }
}
```

**Voorbeeld succesvolle response**

```json
{
  "success": true,
  "orderId": "ORDER-0123456"
}
```

**Voorbeeld foutresponse**

```json
{
  "success": false,
  "errors": [
    {
      "field": "personal.email",
      "message": "Voer een geldig e-mailadres in."
    }
  ]
}
```
