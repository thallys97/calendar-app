// Variáveis globais para manter o controle do mês e ano atual
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();


const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


// Função para obter a data atual no formato "aaaa-mm-dd"
function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Função para obter o número de dias do mês anterior
function getDaysInPreviousMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// Função para gerar o cabeçalho do calendário com o mês e o ano corretos
function updateCalendarHeader() {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    document.getElementById('current-month-year').textContent = `${monthNames[currentMonth]} ${currentYear}`;
}


// Função para atualizar o estado do botão de retorno ao mês atual
function updateReturnToCurrentMonthButton() {
    const returnButton = document.getElementById('return-to-current-month');
    if (currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
        returnButton.style.display = 'none';
    } else {
        returnButton.style.display = 'block';
    }
}


// Função para fazer a célula piscar
function flashCell(cell) {
    cell.classList.add('flash');
    setTimeout(() => {
        cell.classList.remove('flash');
    }, 300); // Este número deve coincidir com a duração da transição definida no CSS
}

// Função para atualizar a barra lateral com o dia da semana e o número do dia
function updateAside(cell, eventsForDate) {
    const date = cell.getAttribute('data-date');
    const dayOfWeek = cell.getAttribute('data-day-of-week');
    const dayNumber = cell.getAttribute('data-day');
    const monthName = cell.getAttribute('data-month');
    const year = date.split('-')[0]; // Extrai o ano da data completa
    const asideContent = document.querySelector('aside');


    // Carregar eventos do localStorage
    loadEventsFromLocal(); // Isso irá atualizar a variável global 'events'

     // Filtrar eventos para a data clicada
    
    const filteredEvents = eventsForDate.filter(event => event.date === date);

    // Ordenar eventos (eventos sem startTime no topo)
    filteredEvents.sort((a, b) => {
        if (!a.startTime) return -1;
        if (!b.startTime) return 1;
        return a.startTime.localeCompare(b.startTime); // Ordenar por startTime
    });

    
    // Limpar o conteúdo existente no aside e adicionar o título
    asideContent.innerHTML = `

    <button id="return-to-current-month" class="action-button" style="display: none;">Voltar para o mês atual</button>
    
    <h2 class="aside-title">${dayOfWeek}, ${dayNumber} de ${monthName} de ${year}</h2> 
    
    <button id="add-event" class="action-button">Adicionar Evento</button> 

    <div class="aside-events">
    
    </div>
    
    `;

    const asideEvents = document.querySelector('.aside-events');
    
    // Adicionar eventos ao aside
    filteredEvents.forEach(event => {
        const eventDiv = document.createElement('div');
        const eventTypeClass = `event-${event.eventType}`;
        eventDiv.classList.add('event', eventTypeClass);
    
        const deleteButton = document.createElement('span');
        deleteButton.classList.add('event-delete-button');
        deleteButton.textContent = 'X';
        deleteButton.onclick = () => deleteEvent(event.id, cell);

        const editButton = document.createElement('span');
        editButton.innerHTML = '&#9998;'; // Exemplo usando um caractere de edição
        editButton.classList.add('event-edit-button');
        editButton.onclick = () => editEventForm(event.id);
    
        const eventTypeToLabel = {
            none: 'nenhum',
            personal: 'assunto pessoal',
            work: 'trabalho',
            family: 'família',
            study: 'estudo',
            leisure: 'lazer'
        };
        
        const eventInfoElements = [
            `<h4>${event.title}</h4>`,
            `<p>Tipo: ${eventTypeToLabel[event.eventType] || event.eventType}</p>`
        ];
    
        // Adiciona condicionalmente cada campo ao array
        if (event.startTime) eventInfoElements.push(`<p>Início: ${event.startTime}</p>`);
        if (event.endTime) eventInfoElements.push(`<p>Término: ${event.endTime}</p>`);
        if (event.location) eventInfoElements.push(`<p>Local: ${event.location}</p>`);
        if (event.description) eventInfoElements.push(`<p>Descrição: ${event.description}</p>`);
    
        // Junta todos os elementos do array em uma string HTML
        eventDiv.innerHTML = `<div class="event-info">${eventInfoElements.join('')}</div>`;
        eventDiv.appendChild(editButton);
        eventDiv.appendChild(deleteButton);
        asideEvents.appendChild(eventDiv);
    });
    
    


    updateReturnToCurrentMonthButton()

    // Event listener para o botão "Voltar para o mês atual"
    document.getElementById('return-to-current-month').addEventListener('click', () => {
        currentMonth = new Date().getMonth();
        currentYear = new Date().getFullYear();
        generateCalendar(currentMonth, currentYear);
        updateCalendarCells();
        updateReturnToCurrentMonthButton();
        handleCalendarCellClick();
    });

}


// Função para atualizar as células do calendário com eventos
function updateCalendarCells() {
    const cells = document.querySelectorAll('.calendar-cell');

    cells.forEach(cell => {
        // Seleciona um possível container de eventos existente e o remove
        const existingContainer = cell.querySelector('.cell-events-container');
        if (existingContainer) {
            existingContainer.remove();
        }

        const date = cell.getAttribute('data-date');
        const eventsForDate = events.filter(event => event.date === date);

        // Cria um novo container para os eventos
        const eventsContainer = document.createElement('div');
        eventsContainer.classList.add('cell-events-container');

        // Adiciona eventos ao container de eventos
        eventsForDate.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.textContent = event.title;
            eventElement.classList.add('cell-event', `event-${event.eventType}`);
            eventsContainer.appendChild(eventElement);
        });

        // Se houver eventos, adiciona o container à célula
        if (eventsForDate.length > 0) {
            cell.appendChild(eventsContainer);
        }
    });
}


// Função para preparar o botão de adicionar evento
function prepareAddEventButton(cell) {
    const date = cell.getAttribute('data-date');
    const addButton = document.getElementById('add-event');
    addButton.onclick = function() {
        // Aqui você definiria a lógica para abrir o modal e preencher a data do evento
        showEventModal();
        // document.getElementById('event-start-date').value = date;
        // document.getElementById('event-end-date').value = date;
    };
}

// Função para mostrar o modal de eventos
function showEventModal() {
    const modal = document.getElementById('event-modal');
    const modalBackground = document.querySelector('.modal-background');
    modal.style.display = "block";
    modalBackground.style.display = "block";

    const submitButton = document.getElementById('event-form').querySelector('.submit-button');
    if (editingEventId) {
        submitButton.textContent = 'Atualizar Evento';
    } else {
        submitButton.textContent = 'Salvar Evento';
    }


    const modalHeader = document.getElementById('event-modal').querySelector('.modal-header');
    if (editingEventId) {
        modalHeader.textContent = 'Editar Evento';
    } else {
        modalHeader.textContent = 'Adicionar Evento';
    }


}

function hideEventModal() {

    const closeModalButton = document.getElementById("close-modal");

    const modal = document.getElementById('event-modal');
    const modalBackground = document.querySelector('.modal-background');

    closeModalButton.addEventListener("click", function () {

        modal.style.display = "none";
        modalBackground.style.display = "none";

   });
}


// Adicione o listener para todas as células do calendário após elas serem geradas
function handleCalendarCellClick () {
    document.querySelectorAll('.calendar-cell').forEach(cell => {
        cell.addEventListener('click', function() {
            // Verifica se a célula clicada representa um dia do mês anterior
            if (!this.classList.contains('previous-month')) {
                selectedDate = this.getAttribute('data-date');
                flashCell(this);
                const events = loadEventsFromLocal(); // Carrega eventos
                updateAside(this, events); // Passa os eventos carregados para updateAside
                prepareAddEventButton(this);
            }
        });
    }); 
    
    
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
        const dayNumber = i + 1; // Dia do mês anterior
    
        // Calcula o dia da semana para o dia do mês anterior
        const previousMonthDate = new Date(year, month - 1, dayNumber);
        const dayOfWeek = weekDays[previousMonthDate.getDay()];
    
        dayCell.textContent = dayNumber;
        dayCell.setAttribute('data-date', previousMonthDate.toISOString().split('T')[0]);
        dayCell.setAttribute('data-day-of-week', dayOfWeek);  // Define o dia da semana
        dayCell.setAttribute('data-month', monthNames[month]); // Atribuir o nome do mês à célula
    
        calendarContainer.appendChild(dayCell);
    }


    // Criar células do calendário para cada dia do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-cell');

        // Verifique se a célula representa o dia atual
        if (getCurrentDate() === `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`) {
            dayCell.classList.add('current-day');
        }

        const date = new Date(year, month, day);
        const dayOfWeek = weekDays[date.getDay()]; // Obtém o dia da semana
        dayCell.setAttribute('data-date', date.toISOString().split('T')[0]);
        dayCell.setAttribute('data-day-of-week', dayOfWeek); // Define o dia da semana
        dayCell.setAttribute('data-month', monthNames[month]); // Atribuir o nome do mês à célula
        dayCell.setAttribute('data-day', day);
        dayCell.textContent = day;
        calendarContainer.appendChild(dayCell);
    }
}



// Adiciona event listeners uma vez que o DOM esteja completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    generateCalendar(currentMonth, currentYear);

    loadEventsFromLocal() // Carrega os eventos do localStorage

    updateCalendarCells(); // Agora atualiza as células com os eventos carregados

    // Event listeners para os botões de navegação
    document.getElementById('prev-month').addEventListener('click', () => {
        if (currentMonth === 0) {
            currentYear--;
            currentMonth = 11;
        } else {
            currentMonth--;
        }
        generateCalendar(currentMonth, currentYear);
        updateCalendarCells();
        updateReturnToCurrentMonthButton(); // Atualize o botão após a navegação
        handleCalendarCellClick();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        if (currentMonth === 11) {
            currentYear++;
            currentMonth = 0;
        } else {
            currentMonth++;
        }
        generateCalendar(currentMonth, currentYear);
        updateCalendarCells();
        updateReturnToCurrentMonthButton(); // Atualize o botão após a navegação
        handleCalendarCellClick();
    });

    // Event listener para o botão "Voltar para o mês atual"
    document.getElementById('return-to-current-month').addEventListener('click', () => {
        currentMonth = new Date().getMonth();
        currentYear = new Date().getFullYear();
        generateCalendar(currentMonth, currentYear);
        updateCalendarCells();
        updateReturnToCurrentMonthButton();
        handleCalendarCellClick();
    });
    
    handleCalendarCellClick();

    hideEventModal();

});
