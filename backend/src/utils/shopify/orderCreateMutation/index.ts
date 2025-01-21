export const mutation = `
        mutation M($order: OrderCreateOrderInput!, $options: OrderCreateOptionsInput) {
          orderCreate(order: $order, options: $options) {
            order {
              id
              billingAddress {
                firstName
                lastName
                address1
                phone
                city
                country
                zip
              }
              currencyCode
              customer {
                id
                firstName
                lastName
                email
              }
              discountCodes
              displayFinancialStatus
              displayFulfillmentStatus
              email
              fulfillments(first: 50) {
                location {
                  id
                }
              }
              lineItems(first: 50) {
                nodes {
                  variant {
                    id
                  }
                  title
                  originalUnitPriceSet {
                    shopMoney {
                      amount
                      currencyCode
                    }
                  }
                  quantity
                  taxLines {
                    title
                    rate
                    priceSet {
                      shopMoney {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
              phone
              shippingAddress {
                firstName
                lastName
                address1
                phone
                city
                country
                zip
              }
              taxLines {
                title
                rate
                priceSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
              }
              totalTaxSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              transactions {
                kind
                status
                amountSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `;