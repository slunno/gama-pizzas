const whatsappNumber = "5543984483051";

export function buildWhatsAppLink(message) {
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}
