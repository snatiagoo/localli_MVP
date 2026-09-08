import { checkoutFunction } from "./actions";

// Functional-only for now — real design comes later during UI/UX polish.
export default function PaywallPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <form action={checkoutFunction}>
        <button
          type="submit"
          className="rounded-md bg-black text-white px-6 py-3"
        >
          Suscribirme
        </button>
      </form>
    </main>
  );
}