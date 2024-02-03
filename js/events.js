// Array para manter o controle dos eventos
let events = [];

// Função para adicionar um evento
function addEvent(title, startDate, endDate, startTime, endTime, location, description) {
    // Cria um identificador único para o evento, poderia ser uma combinação de data e hora
    const eventId = Date.now().toString();

    // Cria um objeto de evento com os dados do formulário
    const event = {
        id: eventId,
        title,
        startDate,
        endDate,
        startTime,
        endTime,
        location,
        description
    };

    // Armazena o evento no objeto de eventos, usando o eventId como chave
    events[eventId] = event;

    // Atualiza o calendário para mostrar o novo evento
    updateCalendarWithEvents();

    // Salva os eventos no localStorage
    saveEventsToLocal();
}

// Função para editar um evento existente
function editEvent(eventId, newDetails) {
    // Atualiza os detalhes do evento
    if (events[eventId]) {
        events[eventId] = { ...events[eventId], ...newDetails };
        saveEventsToLocal();
        updateCalendarWithEvents();
    }
}

// Função para excluir um evento
function deleteEvent(eventId) {
    // Remove o evento do objeto de eventos
    if (events[eventId]) {
        delete events[eventId];
        saveEventsToLocal();
        updateCalendarWithEvents();
    }
}

// Função para mostrar os eventos no calendário
function updateCalendarWithEvents() {
    // Limpar eventos antigos do calendário
    // Iterar sobre o objeto de eventos
    for (const eventId in events) {
        const event = events[eventId];
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.textContent = event.title; // Adicione aqui mais detalhes se necessário
        // Encontrar a célula do calendário correspondente à data do evento e adicionar o eventoElement
        const eventDate = new Date(event.startDate);
        const dayCell = document.querySelector(`.calendar-cell[data-date="${eventDate.toISOString().split('T')[0]}"]`);
        if (dayCell) {
            dayCell.appendChild(eventElement);
        }
    }
}

// Função para salvar eventos no localStorage
function saveEventsToLocal() {
    localStorage.setItem('events', JSON.stringify(events));
}

// Função para carregar eventos do localStorage
function loadEventsFromLocal() {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
        events = JSON.parse(storedEvents);
        updateCalendarWithEvents();
    }
}

// Adiciona o event listener ao formulário de evento
document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Aqui você captura os dados do formulário
    const title = document.getElementById('event-title').value;
    const startDate = document.getElementById('event-start-date').value;
    const endDate = document.getElementById('event-end-date').value;
    const startTime = document.getElementById('event-start-time').value;
    const endTime = document.getElementById('event-end-time').value;
    const location = document.getElementById('event-location').value;
    const description = document.getElementById('event-description').value;

    // Chama a função addEvent com os dados capturados
    addEvent(title, startDate, endDate, startTime, endTime, location, description);

    // Fecha o modal após adicionar o evento
    hideEventModal();
});

// Chama loadEventsFromLocal quando a página carregar para mostrar os eventos armazenados
window.onload = loadEventsFromLocal;
