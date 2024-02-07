// Array para manter o controle dos eventos
let events = [];
let selectedDate = null; // Esta variável será definida quando uma célula do calendário for clicada

// Variável para rastrear o evento que está sendo editado
let editingEventId = null;


// // Certifique-se de que a função de limpeza seja chamada também quando o fundo do modal é clicado
// document.querySelector('.modal-background').addEventListener('click', clearEditingStateAndCloseModal);

// // Para garantir que a função clearEditingStateAndCloseModal seja chamada ao clicar no botão de fechar no seu modal
// document.getElementById('close-modal').addEventListener('click', clearEditingStateAndCloseModal);



// Função para adicionar um evento
function addEvent(date, title, eventType, startTime, endTime, location, description) {
    const newEvent = {
        id: Date.now(),
        date,
        title,
        eventType,
        startTime,
        endTime,
        location,
        description
    };

 
    events.push(newEvent);

    // Salva os eventos atualizados no localStorage
    saveEventsToLocal(events);

    
    // Fecha o modal
    const modal = document.getElementById('event-modal');
    const modalBackground = document.querySelector('.modal-background');   
    
    modal.style.display = "none";
    modalBackground.style.display = "none";
    
    // Encontra a célula correspondente à selectedDate
    const cell = document.querySelector(`.calendar-cell[data-date="${date}"]`);
    
    // Chama loadEventsFromLocal para atualizar a lista de eventos com o novo evento
    const loadEvents = loadEventsFromLocal();
    
    // Chama updateAside para atualizar o aside com os eventos da célula clicada
    if (cell) {
        updateAside(cell, loadEvents);
    }
    
    prepareAddEventButton(cell);
    
    updateCalendarCells();
}


// Função que limpa o editingEventId e fecha o modal
function clearEditingStateAndCloseModal() {
    
    editingEventId = null; // Limpa o estado de edição

    const modal = document.getElementById('event-modal');
    const modalBackground = document.querySelector('.modal-background');   
    
    modal.style.display = "none";
    modalBackground.style.display = "none";      // Fecha o modal

     // Limpa o formulário
     document.getElementById('event-form').reset();

}


// Função para editar um evento existente
function editEventForm(eventId) {
    // Pega o evento para editar
    const eventToEdit = events.find(event => event.id === eventId);
    if (!eventToEdit) return;

    // Preenche o formulário com os dados do evento
    document.getElementById('event-title').value = eventToEdit.title;
    document.getElementById('event-type').value = eventToEdit.eventType;
    document.getElementById('event-start-time').value = eventToEdit.startTime;
    document.getElementById('event-end-time').value = eventToEdit.endTime;
    document.getElementById('event-location').value = eventToEdit.location;
    document.getElementById('event-description').value = eventToEdit.description;

    // Atualiza o ID do evento que está sendo editado
    editingEventId = eventId;

    // Mostra o modal para edição
    showEventModal();

    document.getElementById('close-modal').onclick = clearEditingStateAndCloseModal;

}


function updateEvent(eventId, newDetails) {
    const eventIndex = events.findIndex(event => event.id === eventId);
    if (eventIndex === -1) return;

    // Atualiza os detalhes do evento
    events[eventIndex] = { ...events[eventIndex], ...newDetails };
    // Salva os eventos atualizados no localStorage
    saveEventsToLocal(events);
    // Atualiza a interface do usuário
    const cell = document.querySelector(`.calendar-cell[data-date="${events[eventIndex].date}"]`);
    if (cell) {
        updateAside(cell, events);
        prepareAddEventButton(cell);
    }
}


// Função para excluir um evento
function deleteEvent(eventId, cell) {
    // Remove o evento com o id especificado
    events = events.filter(event => event.id !== eventId);

    // Salva os eventos atualizados no localStorage
    saveEventsToLocal(events);

    
    updateCalendarCells();

    // Atualiza o aside para refletir a remoção do evento
    updateAside(cell, events);

    prepareAddEventButton(cell);
}

// Função para mostrar os eventos no calendário
function updateCalendarWithEvents() {
   
}

// Função para salvar eventos no localStorage
function saveEventsToLocal(events) {
    localStorage.setItem('events', JSON.stringify(events));
}

// Função para carregar eventos do localStorage
function loadEventsFromLocal() {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
        events = JSON.parse(storedEvents);
        return events;
    }
    return [];
}


// Adiciona o event listener ao formulário de evento
document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impedir o envio do formulário

    // Captura os valores do formulário
    const title = document.getElementById('event-title').value;
    const eventType = document.getElementById('event-type').value;
    const startTime = document.getElementById('event-start-time').value;
    const endTime = document.getElementById('event-end-time').value;
    const location = document.getElementById('event-location').value;
    const description = document.getElementById('event-description').value;

    
        // Adiciona validação para garantir que o endTime só é enviado se startTime também for
        if (!startTime && endTime) {
            alert("Por favor, forneça um horário de início antes de definir um horário de término.");
            return;
        }


    // Verifica se o horário de término é maior que o horário de início
    if (endTime && (endTime <= startTime)) {
        alert("O horário de término deve ser maior que o horário de início.");
        return;
    }

    if (editingEventId) {
        // Atualiza o evento existente
        updateEvent(editingEventId, {
            title: title,
            eventType: eventType,
            startTime: startTime,
            endTime: endTime,
            location: location,
            description: description
        });

        // Limpa o ID de edição para o próximo uso do formulário
        editingEventId = null;
    } else {
        // Adiciona um novo evento
        addEvent(selectedDate, title, eventType, startTime, endTime, location, description);
    }

    // Reseta o formulário após a adição
    event.target.reset();

    // Atualiza a exibição de eventos
    updateCalendarCells();

     // Fecha o modal
     // Fecha o modal
    const modal = document.getElementById('event-modal');
    const modalBackground = document.querySelector('.modal-background');   
    
    modal.style.display = "none";
    modalBackground.style.display = "none";

});


// Chama loadEventsFromLocal quando a página carregar para mostrar os eventos armazenados
window.onload = loadEventsFromLocal;


// Certifique-se de que a função de limpeza seja chamada também quando o fundo do modal é clicado
document.querySelector('.modal-background').addEventListener('click', clearEditingStateAndCloseModal);
