// Esperar a que cargue toda la página
document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // ELEMENTOS DEL HTML
    // ============================
    const btnAbrir = document.getElementById("btnAbrir");
    const pantalla = document.getElementById("pantallaBienvenida");
    const musica = document.getElementById("musicaFondo");

    // ============================
    // FECHA DEL EVENTO
    // Formato: Año, Mes (0-11), Día, Hora, Minuto
    // ============================
    const fechaEvento = new Date(2026, 9, 17, 19, 0, 0);

    // ============================
    // ABRIR INVITACIÓN
    // ============================
    if (btnAbrir) {
        btnAbrir.addEventListener("click", async () => {

            // Animación para ocultar la bienvenida
            pantalla.style.transition = "opacity 0.8s ease";
            pantalla.style.opacity = "0";

            setTimeout(() => {
                pantalla.style.display = "none";
            }, 800);

            // Intentar reproducir la música
            if (musica) {
                try {
                    musica.volume = 0.5; // 50% de volumen
                    await musica.play();
                } catch (e) {
                    console.log("El navegador bloqueó la reproducción automática.");
                }
            }
        });
    }

    // ============================
    // CUENTA REGRESIVA
    // ============================
    function actualizarContador() {

        const ahora = new Date();
        const diferencia = fechaEvento - ahora;

        const diasEl = document.getElementById("dias");
        const horasEl = document.getElementById("horas");
        const minutosEl = document.getElementById("minutos");
        const segundosEl = document.getElementById("segundos");

        if (!diasEl || !horasEl || !minutosEl || !segundosEl) {
            return;
        }

        if (diferencia <= 0) {
            diasEl.textContent = "00";
            horasEl.textContent = "00";
            minutosEl.textContent = "00";
            segundosEl.textContent = "00";
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
        const segundos = Math.floor((diferencia / 1000) % 60);

        diasEl.textContent = String(dias).padStart(2, "0");
        horasEl.textContent = String(horas).padStart(2, "0");
        minutosEl.textContent = String(minutos).padStart(2, "0");
        segundosEl.textContent = String(segundos).padStart(2, "0");
    }

    // Actualizar inmediatamente y luego cada segundo
    actualizarContador();
    setInterval(actualizarContador, 1000);

});