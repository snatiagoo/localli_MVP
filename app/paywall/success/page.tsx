// Placeholder — temporary intermediate page Stripe Checkout redirects to
// after a successful payment. Right now it's just a stand-in; it still
// needs to actually confirm the subscription is active (the webhook update
// can lag slightly behind this redirect) before sending the business on to
// /dashboard. Design + the confirming-state logic come later.
export default function PaywallSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <p>Confirmando tu pago...</p>
    </main>
  );
}
