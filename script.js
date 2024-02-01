// Adiciona event listeners uma vez que o DOM esteja completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    generateCalendar();

    // Adicionar listeners para os botões 'Anterior', 'Próximo' e 'Hoje'
    // ...
});

function generateCalendar() {
    const calendarContainer = document.getElementById('calendar');
    // Suponha que estamos gerando para o mês atual por enquanto
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Limpar o calendário existente
    calendarContainer.innerHTML = '';

    // Obter o primeiro dia do mês
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Criar células do calendário para cada dia do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-cell');
        // Adicionar a data ao elemento (apenas para visualização, formatos diferentes podem ser aplicados)
        dayCell.textContent = day;
        // Adicionar mais lógica aqui, como adicionar event listeners para cada célula
        calendarContainer.appendChild(dayCell);
    }

    // Adicionar navegação entre meses aqui
    // ...
}

// Funções para mostrar e esconder o pop-up
function showEventModal() {
    document.getElementById('event-modal').classList.add('active');
    document.querySelector('.modal-background').classList.add('active');
}

function hideEventModal() {
    document.getElementById('event-modal').classList.remove('active');
    document.querySelector('.modal-background').classList.remove('active');
}


// Supondo que você tenha os botões com os IDs 'prev-month' e 'next-month'
document.getElementById('prev-month').addEventListener('click', () => {
    // Lógica para ir para o mês anterior
});

document.getElementById('next-month').addEventListener('click', () => {
    // Lógica para ir para o próximo mês
});

// Para o botão de adicionar evento
document.getElementById('add-event').addEventListener('click', showEventModal);
document.getElementById('close-modal').addEventListener('click', hideEventModal);

