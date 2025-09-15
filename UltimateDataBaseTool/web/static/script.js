// Показать Telegram ID
async function showTelegramId() {
    try {
        //В реальном приложении получаем ID из Telegram Web App
        const tg = window.Telegram.WebApp;
        const user_id = tg.initDataUnsafe?.user.id;
 
        
        // Для демо используем фиктивный ID
        //const user_id = 123456789;
        
        const response = await fetch(`/api/user_info?user_id=${user_id}`);
        const data = await response.json();
        
        document.getElementById('telegramIdResult').innerHTML = `
            <div class="success">
                ✅ Ваш Telegram ID: <strong>${data.telegram_id}</strong>
            </div>
        `;
        
        // Заполняем поле для отправки сообщения
        document.getElementById('chatId').value = data.telegram_id;
        
    } catch (error) {
        document.getElementById('telegramIdResult').innerHTML = `
            <div class="error">❌ Ошибка: ${error.message}</div>
        `;
    }
}

// Отправить сообщение
async function sendMessage(event) {
    event.preventDefault();
    
    const chatId = document.getElementById('chatId').value;
    const text = "Привет из веб-приложения! 🎉";
    
    try {
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('text', text);
        
        const response = await fetch('/api/send_message', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        document.getElementById('messageResult').innerHTML = `
            <div class="success">
                ✅ Сообщение отправлено в Telegram!
            </div>
        `;
        
    } catch (error) {
        document.getElementById('messageResult').innerHTML = `
            <div class="error">❌ Ошибка отправки: ${error.message}</div>
        `;
    }
}