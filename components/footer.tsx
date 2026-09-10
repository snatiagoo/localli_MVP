import Link from "next/link";
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

        <span>Contacto: locallicont@gmail.com</span>
      </div>
    </footer>
  );
}
