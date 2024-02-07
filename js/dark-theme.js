// Função para alternar os temas
// Função para alternar os temas com armazenamento da preferência
function toggleTheme() {
    const body = document.body;
    const themeToggleButton = document.getElementById('theme-toggle');
    
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        themeToggleButton.textContent = 'Modo Claro';
        localStorage.setItem('theme', 'dark'); // Armazena a preferência do tema
    } else {
        themeToggleButton.textContent = 'Modo Escuro';
        localStorage.removeItem('theme'); // Remove a preferência do tema
    }
}

// Adiciona o event listener ao botão de alternância de tema
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Carrega o tema preferido do usuário do localStorage
window.onload = function() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-toggle').textContent = 'Modo Claro';
    }
};
