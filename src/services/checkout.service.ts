import { prisma } from "../config";
import { apiResponse } from "../utils/errors.utils";
const Stripe = require('stripe');
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

interface Product {
    name: string;
    price: number;
    salePrice?: number | null;
}

interface CartItem {
    qty: number;
    product: Product;
}

export const createStripeCheckoutSession = async (cartItems: CartItem[], userEmail: string) => {
    try {
        // Map cart items to Stripe line items
        const line_items = cartItems.map((item: CartItem) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.product.name,
                },
                unit_amount: Math.round((item.product.salePrice || item.product.price) * 100),
            },
            quantity: item.qty,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: process.env.FRONTEND_URL + '/checkout?success=true',
            cancel_url: process.env.FRONTEND_URL + '/checkout?canceled=true',
            customer_email: userEmail,
        });

        return apiResponse(false, undefined, { url: session.url });
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}]);
    }
}