// Splits "text **bold** more text" into alternating plain/bold pieces and
// renders the **-wrapped ones as <strong> — shared between anywhere that
// needs to mark emphasis inside plain-string content (Claude captions,
// static copy like the guidance descriptions) without storing raw JSX.
export function renderWithBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}
