const DEFAULT_WHATSAPP_NUMBER = "5544999316666";

const whatsappNumber = String(
  import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER,
).replace(/\D/g, "");

export function buildWhatsAppLink(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
