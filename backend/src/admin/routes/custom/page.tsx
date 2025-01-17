import { defineRouteConfig } from "@medusajs/admin-sdk";
import { XMark } from "@medusajs/icons";
import { Container, Heading, Table } from "@medusajs/ui";
import { useEffect, useState } from "react";

interface Cart {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

const AbandonedCartsPage = () => {
  const [abandonedCarts, setAbandonedCarts] = useState<Cart[]>([]);

  useEffect(() => {
    fetch("/admin/cart")
      .then((response) => response.json())
      .then((data) => setAbandonedCarts(data))
      .catch((error) => console.error("Error fetching abandoned carts:", error));
  }, []);

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Heading level="h2" className="text-xl font-bold mr-2 text-white">
            Abandoned Carts
          </Heading>
        </div>
      </div>

      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-white mb-4">Abandoned Carts List</h3>

        <Table className="min-w-full shadow-md">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Cart Created At</Table.HeaderCell>
              <Table.HeaderCell>Last Updated At</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {abandonedCarts.map((cart) => (
              <Table.Row key={cart.id} className="hover:bg-gray-700">
                <Table.Cell className="text-white">{cart.email}</Table.Cell>
                <Table.Cell className="text-white">
                  {new Date(cart.created_at).toLocaleString()}
                </Table.Cell>
                <Table.Cell className="text-white">
                  {new Date(cart.updated_at).toLocaleString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Abandoned Carts",
  icon: XMark,
});

export default AbandonedCartsPage;
