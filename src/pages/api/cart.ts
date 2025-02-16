// // pages/api/cart.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import connectDB from "@/lib/mongodb";
// import Cart from "@/models/cart";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await connectDB();

//   if (req.method === 'POST') {
//     try {
//       const cartItem = await Cart.create(req.body);
//       return res.status(201).json({ success: true, data: cartItem });
//     } catch (error) {
//       return res.status(400).json({ success: false, error: 'Failed to add to cart' });
//     }
//   } 

//   else if (req.method === 'GET') {
//     try {
//       const cartItems = await Cart.find({}).sort({ createdAt: -1 });
//       return res.status(200).json({ success: true, data: cartItems });
//     } catch (error) {
//       return res.status(400).json({ success: false, error: 'Failed to fetch cart items' });
//     }
//   }

//   else if (req.method === 'DELETE') {
//     try {
//       const { id } = req.query;
//       await Cart.findByIdAndDelete(id);
//       return res.status(200).json({ success: true });
//     } catch (error) {
//       return res.status(400).json({ success: false, error: 'Failed to remove item from cart' });
//     }
//   }

//   res.status(405).json({ success: false, error: 'Method not allowed' });
// }

// pages/api/cart.ts
/*import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "@/lib/mongodb";
import Cart from "@/models/cart";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const cartItem = await Cart.create(req.body);
      return res.status(201).json({ success: true, data: cartItem });
    } catch (error) {
      return res.status(400).json({ success: false, error: 'Failed to add to cart' });
    }
  } 
  
  else if (req.method === 'GET') {
    try {
      const cartItems = await Cart.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: cartItems }); // Ensure data is wrapped in "data" field
    } catch (error) {
      return res.status(400).json({ success: false, error: 'Failed to fetch cart items' });
    }
  }

  else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Cart.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json({ success: false, error: 'Failed to remove item from cart' });
    }
  }

  res.status(405).json({ success: false, error: 'Method not allowed' });
}*/





// pages/api/cart.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "@/lib/mongodb";
import Cart from "@/models/cart";

type CartItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  try {
    if (req.method === 'GET') {
      // Get cart items from localStorage on client side instead
      res.status(200).json({
        success: true,
        data: [] // Initially empty as we'll handle data on client side
      });
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      // Handle delete operation
      res.status(200).json({ success: true });
    } else {
      res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}



