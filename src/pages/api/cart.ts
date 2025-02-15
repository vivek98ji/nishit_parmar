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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  // if (req.method === 'POST') {
  //   try {
  //     const { productId, name, imageUrl, price } = req.body;
  //     console.log(req.body)
  //     if (!productId || !name || !imageUrl || !price) {
  //       return res.status(400).json({ success: false, error: "Missing required fields" });
  //     }
  //     // Check if the product already exists in the cart
  //     const existingCartItem = await Cart.findOne({ productId });

  //     if (existingCartItem) {
  //       // If exists, update the quantity
  //       await existingCartItem.save();
  //       return res.status(200).json({ success: true, data: existingCartItem });
  //     } else {
  //       // If not, create a new cart item
  //       // removed quantity
  //       console.log(productId, name, price)
  //       const cartItem = await Cart.create({ productId, name, imageUrl, price });
  //       return res.status(201).json({ success: true, data: cartItem });
  //     }
  //   } catch (error) {
  //     console.error("Error adding service to cart:", error);
  //     return res.status(400).json({ success: false, error: 'Failed to add to cart' });
  //   }
  // }


  if (req.method === 'POST') {
    try {
      const { productId, name, imageUrl, price, description, category, available } = req.body;
      console.log(req.body);

      // Validate required fields
      if (!productId || !name || !imageUrl || !price || !description || !category) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }

      // Check if the product already exists in the cart
      const existingCartItem = await Cart.findOne({ productId });

      if (existingCartItem) {
        // If exists, update the quantity (or any other field if needed)
        await existingCartItem.save();
        return res.status(200).json({ success: true, data: existingCartItem });
      } else {
        // If not, create a new cart item
        const cartItem = await Cart.create({
          productId,
          name,
          imageUrl,
          price,
          description,
          category,
          available: available || true, // Default to true if not provided
        });
        return res.status(201).json({ success: true, data: cartItem });
      }
    } catch (error) {
      console.error("Error adding service to cart:", error);
      return res.status(400).json({ success: false, error: 'Failed to add to cart' });
    }
  }
  else if (req.method === 'GET') {
    try {
      const cartItems = await Cart.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
      console.error("Error adding to cart:", error);
      return res.status(400).json({ success: false, error: 'Failed to fetch cart items' });
    }
  }

  else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Cart.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: 'Item removed from cart' });
    } catch (error) {
      return res.status(400).json({ success: false, error: 'Failed to remove item from cart' });
    }
  }

  res.status(405).json({ success: false, error: 'Method not allowed' });
}



