const CONTACT_PHONE = ["90", "507", "181", "1616"].join("");
const WHATSAPP_MESSAGE = "Merhaba Solut Enerji, enerji sistemi kurulumu hakkında bilgi almak istiyorum.";

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");
const callLinks = document.querySelectorAll("[data-call-link]");
const calculator = document.querySelector("[data-calculator]");
const calculatorWhatsapp = document.querySelector("[data-calculator-whatsapp]");
const leadForm = document.querySelector("[data-lead-form]");

function buildWhatsappUrl(message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(message)}`;
}

function updateContactLinks() {
  whatsappLinks.forEach((link) => {
    link.href = buildWhatsappUrl();
  });
  callLinks.forEach((link) => {
    link.href = `tel:+${CONTACT_PHONE}`;
  });
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("tr-TR").format(value) + " TL";
}

function updateCalculator() {
  const input = calculator.querySelector("#bill");
  const billOutput = calculator.querySelector("[data-bill-output]");
  const systemOutput = calculator.querySelector("[data-system-output]");
  const noteOutput = calculator.querySelector("[data-note-output]");
  const bill = Number(input.value);

  billOutput.textContent = formatCurrency(bill);

  if (bill < 3000) {
    systemOutput.textContent = "Tüketim analizi önerilir";
    noteOutput.textContent = "Küçük ölçekli ongrid sistem veya ürün bazlı çözüm uygun olabilir.";
  } else if (bill < 9000) {
    systemOutput.textContent = "Mesken GES için güçlü aday";
    noteOutput.textContent = "Ongrid veya hibrit sistem değerlendirmeye değer.";
  } else {
    systemOutput.textContent = "Yüksek tasarruf potansiyeli";
    noteOutput.textContent = "Hibrit, bataryalı veya tarımsal kullanım senaryosu ayrıca incelenmeli.";
  }

  if (calculatorWhatsapp) {
    const message = [
      "Merhaba Solut Enerji, elektrik faturama göre ön değerlendirme almak istiyorum.",
      `Aylık elektrik faturam: ${formatCurrency(bill)}`,
      `Ön yönlendirme: ${systemOutput.textContent}`,
      noteOutput.textContent,
    ].join("\n");
    calculatorWhatsapp.href = buildWhatsappUrl(message);
  }
}

updateContactLinks();
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

function closeMenu() {
  header.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}

function smoothScrollTo(target) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.scrollIntoView();
    return;
  }

  const headerOffset = header.offsetHeight + 18;
  const start = window.scrollY;
  const targetY = target.getBoundingClientRect().top + start - headerOffset;
  const distance = targetY - start;
  const duration = Math.min(950, Math.max(520, Math.abs(distance) * 0.45));
  let startTime;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function step(timestamp) {
    startTime ??= timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    window.scrollTo(0, start + distance * easeOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    closeMenu();
    smoothScrollTo(target);
  });
});

if (calculator) {
  const input = calculator.querySelector("#bill");
  input.addEventListener("input", updateCalculator);
  updateCalculator();
}

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(leadForm);
    const name = data.get("name")?.toString().trim();
    const topic = data.get("topic")?.toString().trim();
    const message = data.get("message")?.toString().trim();
    const text = [
      "Merhaba Solut Enerji, web sitesi üzerinden iletişime geçiyorum.",
      name ? `Ad Soyad: ${name}` : "",
      topic ? `İlgilendiğim hizmet: ${topic}` : "",
      message ? `Not: ${message}` : "",
    ].filter(Boolean).join("\n");

    window.open(buildWhatsappUrl(text), "_blank", "noopener,noreferrer");
  });
}
