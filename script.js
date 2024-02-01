// JavaScript para a interatividade do calendário
document.addEventListener('DOMContentLoaded', function () {
    // Lógica para gerar o calendário aqui
    function generateCalendar() {
        const calendarContainer = document.getElementById('calendar');
        // Limpar o calendário existente
        calendarContainer.innerHTML = '';
        // Gerar novas células do calendário
        // ...
    }

    // Event listeners para botões e navegação
    // ...
});

// Funções para mostrar e esconder o pop-up
function showEventModal() {
    document.getElementById('event-modal').classList.add('active');
    document.querySelector('.modal-background').classList.add('active');
}

function hideEventModal() {
    document.getElementById('event-modal').classList.remove('active');
    document.querySelector('.modal-background').classList.remove('active');
}
