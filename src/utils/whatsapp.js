const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

export function buildWhatsAppLink(message) {
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}
