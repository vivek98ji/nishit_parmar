import { useEffect, useState } from 'react';
import { Card, CardContent } from '.././ui/card';
import  Button  from '.././ui/button';
import { Trash2 } from 'lucide-react';

interface CartItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart');
      const result = await response.json();
      if (result.success) {
        setCartItems(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      const response = await fetch(`/api/cart?id=${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setCartItems(cartItems.filter(item => item._id !== id));
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      <div className="grid gap-4">
        {cartItems.map((item) => (
          <Card key={item._id} className="w-full">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  <div className="mt-2">
                    <span className="text-lg font-medium">₹{item.price}</span>
                    <span className="ml-4 text-sm text-gray-500 capitalize">
                      Category: {item.category}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {cartItems.length > 0 ? (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Total Amount:</span>
            <span className="text-xl font-bold">₹{totalAmount}</span>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      )}
    </div>
  );
}