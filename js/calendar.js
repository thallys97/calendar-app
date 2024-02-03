// Variáveis globais para manter o controle do mês e ano atual
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Função para gerar o cabeçalho do calendário com o mês e o ano corretos
function updateCalendarHeader() {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    document.getElementById('current-month-year').textContent = `${monthNames[currentMonth]} ${currentYear}`;
}

// Função para obter o número de dias do mês anterior
function getDaysInPreviousMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// Função para gerar o calendário
function generateCalendar(month, year) {
    const calendarContainer = document.getElementById('calendar-days');
    calendarContainer.innerHTML = ''; // Limpar o calendário existente

    // Atualizar o cabeçalho do calendário
    updateCalendarHeader();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysInPreviousMonth = getDaysInPreviousMonth(month, year);
    const lastDayOfPreviousMonth = new Date(year, month, 0).getDay();

    // // Adiciona células vazias para os dias do mês anterior
    // for (let i = 0; i < firstDayOfMonth; i++) {
    //     const emptyCell = document.createElement('div');
    //     emptyCell.classList.add('calendar-cell');
    //     calendarContainer.appendChild(emptyCell);
    // }

    // Adiciona células em cinza para os dias do mês anterior
    for (let i = daysInPreviousMonth - firstDayOfMonth; i < daysInPreviousMonth; i++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-cell', 'previous-month');
        dayCell.textContent = i + 1; // Isso irá adicionar os últimos dias do mês anterior
        calendarContainer.appendChild(dayCell);
    }


    // Criar células do calendário para cada dia do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-cell');
        const date = new Date(year, month, day);
        dayCell.setAttribute('data-date', date.toISOString().split('T')[0]);
        dayCell.textContent = day;
        calendarContainer.appendChild(dayCell);
    }
}

// Adiciona event listeners uma vez que o DOM esteja completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    generateCalendar(currentMonth, currentYear);

    // Event listeners para os botões de navegação
    document.getElementById('prev-month').addEventListener('click', () => {
        if (currentMonth === 0) {
            currentYear--;
            currentMonth = 11;
        } else {
            currentMonth--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    document.getElementById('next-month').addEventListener('click', () => {
        if (currentMonth === 11) {
            currentYear++;
            currentMonth = 0;
        } else {
            currentMonth++;
        }
        generateCalendar(currentMonth, currentYear);
    });

    // // Event listeners para adicionar e fechar o modal de eventos
    // document.getElementById('add-event').addEventListener('click', showEventModal);
    // document.getElementById('close-modal').addEventListener('click', hideEventModal);
});

// // Funções para mostrar e esconder o pop-up
// function showEventModal() {
//     document.getElementById('event-modal').classList.add('active');
//     document.querySelector('.modal-background').classList.add('active');
// }

// function hideEventModal() {
//     document.getElementById('event-modal').classList.remove('active');
//     document.querySelector('.modal-background').classList.remove('active');
// }




