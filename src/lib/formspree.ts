/** Formspree form ID yoksa null (form gönderilemez; yapılandırma gerekir). */
export function getFormspreeAction(): string | null {
  const id = import.meta.env.PUBLIC_FORMSPREE_FORM_ID;
  if (typeof id === 'string' && id.trim().length > 0) {
    return `https://formspree.io/f/${id.trim()}`;
  }
  return null;
}
