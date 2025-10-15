export type MidtransCreateParams = { amount:number; orderId:string; customer:{ name:string; email?:string } };
export async function createPaymentLink(params: MidtransCreateParams){
  return { payUrl: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${params.orderId}` };
}
