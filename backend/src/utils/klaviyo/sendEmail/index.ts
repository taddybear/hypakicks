import axios from "axios";
import { Modules, MedusaError } from "@medusajs/framework/utils";
import { registerOrderChangesStep } from "@medusajs/medusa/core-flows";

export const getCustomer = async (email) => {
  try {
    const response = await axios.get(
      `https://a.klaviyo.com/api/profiles/?filter=equals(email,"${email}")`,
      {
        headers: {
          Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`,
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Revision: process.env.KLAVIYO_REVISION,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching customer:", error.response?.data || error);
    throw error;
  }
};

export const createCustomer = async (customer) => {
  try {
    const response = await axios.post(
      "https://a.klaviyo.com/api/profiles",
      {
        data: {
          type: "profile",
          attributes: {
            // location: {
            //   address1: "89 E 42nd St",
            //   address2: "1st floor",
            //   city: "New York",
            //   country: "United States",
            // },
            // properties: {
            //   newKey: "New Value",
            // },
            email: customer.email,
          },
        },
      },
      {
        headers: {
          Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`,
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Revision: process.env.KLAVIYO_REVISION || "2025-01-15",
        },
      }
    );

    console.log(response.data.attributes.email);
    console.log(response.data.id);
    console.log(response.data.attributes.phone_number);
    const email = response.data.attributes.email;
    const profileId = response.data.attributes.email;

    const listID = process.env.KLAVIYO_EMAIL_LIST_ID;

    await subscribeCustomer(email, profileId, listID, customer.phone);

    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error.response?.data || error);
    throw error;
  }
};

export const subscribeCustomer = async (
  profileId,
  email,
  phoneNumber,
  listId
) => {
  try {
    const response = await axios.post(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs",
      {
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [
                {
                  type: "profile",
                  id: profileId,
                  attributes: {
                    subscriptions: {
                      email: {
                        marketing: {
                          consent: "SUBSCRIBED",
                        },
                      },
                    },
                    email: email,
                    phone_number: phoneNumber,
                  },
                },
              ],
            },
            historical_import: false,
            custom_source: "Marketing Event",
          },
          relationships: {
            list: {
              data: {
                type: "list",
                id: listId,
              },
            },
          },
        },
      },
      {
        headers: {
          Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`,
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Revision: process.env.KLAVIYO_REVISION || "2025-01-15",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error subscribing customer:", error.response?.data || error);
    throw error;
  }
};

export const sendConfirmationEmail = async (
  email,
  orderId,
  value,
  currency,
  uniqueId,
  items,
  shipping_address,
  shipping_method,
  transaction
) => {
  try {
    const response = await axios.post(
      "https://a.klaviyo.com/api/events/",
      {
        data: {
          type: "event",
          attributes: {
            properties: {
              OrderId: orderId,
              Items: items.map((item) => ({
                ProductName: item.title + " " + item.subtitle,
                Quantity: item.quantity,
                ItemPrice: item.unit_price,
              })),
              BillingAddress: {
                FirstName: shipping_address?.first_name,
                LastName: shipping_address?.last_name,
                Address1: shipping_address?.address_1,
                City: shipping_address?.city,
                Zip: shipping_address?.postal_code,
                Phone: shipping_address?.phone,
              },
              PaymentAmount: transaction[0].amount - shipping_method.amount,
              time: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }),
              StoreUrl: `${process.env.DEFAULT_FRONTEND_URL}`,
            },
            value: transaction[0].amount,
            value_currency: currency,
            unique_id: uniqueId,
            metric: {
              data: {
                type: "metric",
                attributes: {
                  name: "Placed Order",
                },
              },
            },
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email: email,
                },
              },
            },
          },
        },
      },
      {
        headers: {
          Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`,
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Revision: process.env.KLAVIYO_REVISION || "2025-01-15",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending email event:", error.response?.data || error);
    throw error;
  }
};

export const sendCancelationEmail = async (cart) => {
  try {
    let customer = await getCustomer(cart.email);
    console.log("customer", customer);

    if (!customer.data) {
      customer = await createCustomer({ email: cart.email });
    }

    const email = cart.email;
    const totalAmount = cart.total || 0;
    const currency = cart.currency_code || "USD";
    const shippingAddress = cart.shipping_address;
    const shippingTotal = cart.shipping_total;

    const items = cart.items.map((item) => ({
      id: item.id,
      name: item.title + " " + item.subtitle,
      quantity: item.quantity,
      price: item.total,
    }));

    console.log("Sending email with:", email, totalAmount, currency, items);

    const response = await axios.post(
      "https://a.klaviyo.com/api/events/",
      {
        data: {
          type: "event",
          attributes: {
            properties: {
              TotalAmount: totalAmount,
              Subtotal: totalAmount - shippingTotal,
              Currency: currency,
              Items: items,
              time: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }),
              ShippingAddress: shippingAddress,
              RedirectUrl: `${process.env.DEFAULT_FRONTEND_URL}/checkout?cart_id=${cart.id}`,
            },
            metric: {
              data: {
                type: "metric",
                attributes: {
                  name: "Order Cancel",
                },
              },
            },
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email: email,
                },
              },
            },
          },
        },
      },
      {
        headers: {
          Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`,
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Revision: process.env.KLAVIYO_REVISION || "2025-01-15",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending email event:", error.response?.data || error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email, token) => {
  try {
    const response = await axios.post(
      "https://a.klaviyo.com/api/events/",
      {
        data: {
          type: "event",
          attributes: {
            properties: {
              resetUrl: `${process.env.DEFAULT_FRONTEND_URL}/reset-password?token=${token}&email=${email}`,
            },
            metric: {
              data: {
                type: "metric",
                attributes: {
                  name: "Password Reset",
                },
              },
            },
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email: email,
                },
              },
            },
          },
        },
      },
      {
        headers: {
          Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`,
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Revision: process.env.KLAVIYO_REVISION || "2025-01-15",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending email event:", error.response?.data || error);
    throw error;
  }
};
