// Cargar el header dinámicamente
fetch("src/components/header.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data;

    // ✅ Declaraciones principales
    const header = document.getElementById("mainHeader");
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const darkOverlay = document.getElementById("darkOverlay");
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    const pageMap = {
      "index.html": "inicio",
      "nosotros.html": "nosotros",
      "servicios.html": "servicios",
    };

    const currentKey = pageMap[currentPage];
    let currentSubmenu = null;

    // 🔷 Estilo de página activa
    const allLinks = document.querySelectorAll(".nav-link");
    allLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isActive =
        (currentPage === "" && href === "index.html") || href === currentPage;

      if (isActive) {
        link.classList.remove("text-white");
        link.classList.add("text-moradopa", "font-bold");
      } else {
        link.classList.remove("text-moradopa");
        link.classList.add("text-white");
      }
    });

    // 🔷 Resaltar página activa en menú móvil
    const mobilePageMap = {
      "index.html": "mobile-inicio",
      "nosotros.html": "mobile-nosotros",
      "servicios.html": "mobile-servicios",
    };

    const mobileCurrentId = mobilePageMap[currentPage];
    if (mobileCurrentId) {
      const currentMobileLink = document.getElementById(mobileCurrentId);
      if (currentMobileLink) {
        currentMobileLink.classList.add(
          "bg-moradoclaropa",
          "text-white",
          "cursor-default",
          "pointer-events-none"
        );
      }
    }

    // 🔷 Submenús en desktop
    if (currentKey) {
      const currentLink = document.getElementById(`link-${currentKey}`);
      const currentToggle = document.getElementById(`toggle-${currentKey}`);
      currentSubmenu = document.getElementById(`submenu-${currentKey}`);

      if (currentToggle && currentSubmenu) {
        currentToggle.classList.remove("hidden");

        currentLink.addEventListener("click", (e) => {
          e.preventDefault();
          currentSubmenu.classList.toggle("hidden");
          currentToggle.classList.toggle("rotate-180");
        });

        document.addEventListener("click", function (event) {
          const isClickInside =
            currentLink.contains(event.target) ||
            currentSubmenu.contains(event.target);
          if (!isClickInside) {
            currentSubmenu.classList.add("hidden");
            currentToggle.classList.remove("rotate-180");
          }
        });
      }
    }

    // 🔷 Scroll: header + cierre de menús
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.remove("bg-transparent");
        header.classList.add("bg-celestepa", "shadow-md");

        // Cerrar submenú desktop
        if (currentSubmenu && !currentSubmenu.classList.contains("hidden")) {
          currentSubmenu.classList.add("hidden");
          const currentToggle = document.getElementById(`toggle-${currentKey}`);
          currentToggle?.classList.remove("rotate-180");
        }

        // Cerrar menú móvil
        if (
          mobileMenu &&
          mobileBtn &&
          !mobileMenu.classList.contains("translate-x-full")
        ) {
          closeMobileMenu();
        }
      } else {
        header.classList.remove("bg-celestepa", "shadow-md");
        header.classList.add("bg-transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Ejecutar al cargar

    const setHeaderState = () => {
      // Si estamos en top y menú abierto -> aplicar color header
      if (window.scrollY <= 20 && mobileBtn.classList.contains("open")) {
        header.classList.remove("bg-transparent");
        header.classList.add("bg-celestepa", "shadow-md");
      } else if (
        window.scrollY <= 20 &&
        !mobileBtn.classList.contains("open")
      ) {
        // Top y menú cerrado -> header transparente
        header.classList.remove("bg-celestepa", "shadow-md");
        header.classList.add("bg-transparent");
      }
      // si scroll > 20 ya maneja la función handleScroll original
    };

    const openMobileMenu = () => {
      mobileMenu.classList.remove("translate-x-full");
      mobileBtn.classList.add("open");
      darkOverlay.classList.remove("hidden");
      setHeaderState();
    };

    const closeMobileMenu = () => {
      mobileMenu.classList.add("translate-x-full");
      mobileBtn.classList.remove("open");
      darkOverlay.classList.add("hidden");
      setHeaderState();
    };

    // Abrir o cerrar hamburguesa manual
    mobileBtn?.addEventListener("click", () => {
      const isOpen = mobileBtn.classList.contains("open");
      isOpen ? closeMobileMenu() : openMobileMenu();
    });

    // Cierre al hacer clic fuera del menú móvil
    document.addEventListener("click", function (event) {
      const isClickInside =
        mobileBtn.contains(event.target) || mobileMenu.contains(event.target);
      if (
        !isClickInside &&
        !mobileMenu.classList.contains("translate-x-full")
      ) {
        closeMobileMenu();
      }
    });
  });

// 🔁 Carrusel automático en el hero
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-img");

setInterval(() => {
  slides.forEach((slide, index) => {
    slide.style.opacity = index === currentSlide ? "1" : "0";
  });

  currentSlide = (currentSlide + 1) % slides.length;
}, 4000);

document.addEventListener("DOMContentLoaded", () => {
  const imagen = document.getElementById("cuidadosImagen");
  const texto = document.getElementById("cuidadosTexto");
  const lista = document.getElementById("cuidadosLista");

  function reordenarContenido() {
    const isMobile = window.innerWidth < 768;

    if (isMobile && lista && imagen && texto) {
      // Inserta la imagen entre el texto y la lista
      texto.parentNode.insertBefore(imagen, lista);
    } else if (!isMobile) {
      // Restaurar la imagen a su lugar original en desktop
      const wrapper = document.getElementById("cuidadosWrapper");
      const contenido = document.getElementById("cuidadosContenido");

      if (wrapper && contenido && !wrapper.contains(imagen)) {
        wrapper.insertBefore(imagen, contenido);
      }
    }
  }

  // Llamada inicial
  reordenarContenido();

  // Vuelve a ordenar al redimensionar la ventana
  window.addEventListener("resize", reordenarContenido);
});

// Carga dinámica del footer

fetch("src/components/footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
    lucide.createIcons(); // <- esta línea es clave
  });
// 🔷 Scroll suave personalizado para enlaces internos
document.addEventListener("click", function (e) {
  const link = e.target.closest("a[href^='#']");
  if (link !== null) {
    const hash = link.getAttribute("href");
    const target = document.querySelector(hash);

    if (target) {
      e.preventDefault();

      // Opcional: cerrar menú móvil si está abierto
      const mobileMenu = document.getElementById("mobileMenu");
      if (!mobileMenu.classList.contains("translate-x-full")) {
        mobileMenu.classList.add("translate-x-full");
        document.getElementById("darkOverlay")?.classList.add("hidden");
        document.getElementById("mobileMenuBtn")?.classList.remove("open");
      }

      // Compensar el header fijo (por ejemplo 80px)
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const btnMision = document.getElementById("btnMision");
  const btnVision = document.getElementById("btnVision");
  const contentCard = document.getElementById("contentCard");

  const contenidoMision = `
        <p>
            Ofrecer cuidados paliativos especializados que combinen excelencia médica, apoyo emocional y acompañamiento integral, respetando la individualidad de cada paciente y sus familias.
            Nos comprometemos a brindar un entorno de confianza y empatía que facilite el bienestar físico, emocional y espiritual en cada etapa del cuidado del paciente.
        </p>
    `;
  const contenidoVision = `
        <p>
            Ser reconocidos como líderes en cuidados paliativos en Lima Metropolitana, brindando servicios integrales que prioricen la dignidad, el alivio del sufrimiento y el bienestar emocional de pacientes y sus familias.
            Aspiramos a inspirar un modelo de cuidado humano y compasivo que transforme la percepción de los cuidados paliativos en el Perú.
        </p>
    `;

  // Estado inicial
  let mostrandoMision = true;

  function actualizarBotones() {
    if (mostrandoMision) {
      btnMision.classList.add("active-tab");
      btnMision.classList.remove("inactive-tab");
      btnVision.classList.add("inactive-tab");
      btnVision.classList.remove("active-tab");
    } else {
      btnVision.classList.add("active-tab");
      btnVision.classList.remove("inactive-tab");
      btnMision.classList.add("inactive-tab");
      btnMision.classList.remove("active-tab");
    }
  }

  function cambiarContenido(mostrarMision) {
    mostrandoMision = mostrarMision;
    contentCard.classList.add("opacity-0");
    setTimeout(() => {
      contentCard.innerHTML = mostrandoMision
        ? contenidoMision
        : contenidoVision;
      actualizarBotones();
      contentCard.classList.remove("opacity-0");
    }, 200);
  }

  btnMision.addEventListener("click", () => cambiarContenido(true));
  btnVision.addEventListener("click", () => cambiarContenido(false));

  actualizarBotones(); // inicial
});
