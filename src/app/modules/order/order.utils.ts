// import Shurjopay, { PaymentResponse, VerificationResponse } from 'shurjopay';

// const shurjopay = new Shurjopay();

// // Configure Shurjopay with settings from your config
// shurjopay.config(
//   config.sp.sp_endpoint!,
//   config.sp.sp_username!,
//   config.sp.sp_password!,
//   config.sp.sp_prefix!,
//   config.sp.sp_return_url!
// );

// // Asynchronous function to initiate payment
// const makePaymentAsync = async (
//   paymentPayload: Record<string, unknown>
// ): Promise<PaymentResponse> => {
//   return new Promise((resolve, reject) => {
//     shurjopay.makePayment(
//       paymentPayload,
//       (response) => resolve(response),
//       (error) => reject(error)
//     );
//   });
// };

// // Asynchronous function to verify payment status
// const verifyPaymentAsync = (
//   orderId: string
// ): Promise<VerificationResponse[]> => {
//   return new Promise((resolve, reject) => {
//     shurjopay.verifyPayment(
//       orderId,
//       (response) => resolve(response),
//       (error) => reject(error)
//     );
//   });
// };

// export const orderUtils = {
//   makePaymentAsync,
//   verifyPaymentAsync,
// };
