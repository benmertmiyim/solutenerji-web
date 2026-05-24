/** Formspree form ID yoksa null (form gönderilemez; yapılandırma gerekir). */
export function getFormspreeAction(): string | null {
  const id = import.meta.env.PUBLIC_FORMSPREE_FORM_ID;
  const normalized = typeof id === 'string' ? id.trim() : '';

  if (/^[a-zA-Z0-9]+$/.test(normalized)) {
    return `https://formspree.io/f/${normalized}`;
  }

  return null;
}
