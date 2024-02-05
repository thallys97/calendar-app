// Array para manter o controle dos eventos
let events = [];
let selectedDate = null; // Esta variável será definida quando uma célula do calendário for clicada


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
 
    
     
}

// Função para editar um evento existente
function editEvent(eventId, newDetails) {
    
}

// Função para excluir um evento
function deleteEvent(eventId) {
   
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
  
      // Chama a função addEvent
      addEvent(selectedDate, title, eventType, startTime, endTime, location, description);
  
      event.target.reset();

});

// Chama loadEventsFromLocal quando a página carregar para mostrar os eventos armazenados
window.onload = loadEventsFromLocal;
