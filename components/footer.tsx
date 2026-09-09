import Link from "next/link";

// Placeholder — the four legal pages exist but are empty for now; real
// content (and the contact details below) get filled in later. Required
// reading under Spanish/EU law for a paid SaaS: Aviso Legal (LSSI-CE),
// Política de Privacidad (RGPD/LOPDGDD), Política de Cookies, plus
// Términos y Condiciones as standard commercial practice.
export function Footer() {
  return (
    <footer className="bg-footer mt-auto">
      <div className="max-w-7xl mx-auto px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/70">
        <div className="font-display font-bold text-white">
          Localli<span className="text-accent">.</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/legal/terminos" className="hover:text-white">
            Términos y condiciones
          </Link>
          <Link href="/legal/privacidad" className="hover:text-white">
            Política de privacidad
          </Link>
          <Link href="/legal/cookies" className="hover:text-white">
            Política de cookies
          </Link>
          <Link href="/legal/aviso-legal" className="hover:text-white">
            Aviso legal
          </Link>
        </nav>

        <span>Contacto: [pendiente]</span>
      </div>
    </footer>
  );
}
