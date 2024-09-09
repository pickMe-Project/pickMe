import  Midtrans  from 'midtrans-client';
import { NextResponse } from "next/server";

let Snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
})

export async function POST(request: Request){
    let parameter = {
        item_details: {
            name: "Subsription",
            price: 250000,
            quantity: 1
        },
        transaction_details: {
            order_id: `trx-${Math.random().toString()}`,
            gross_amount: 250000
        }
    }
       
   const token = await Snap.createTransactionToken(parameter);
   console.log(token);
   return NextResponse.json({token});


}
