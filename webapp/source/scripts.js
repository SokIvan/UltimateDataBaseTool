// Основной объект Telegram Web App
const tg = window.Telegram.WebApp;

// Инициализация приложения
function initApp() {
    console.log('Инициализация WebApp...');
    console.log('Telegram object:', window.Telegram);
    console.log('WebApp object:', tg);
    
    if (!tg || !tg.sendData) {
        console.error('Telegram WebApp не доступен!');
        showResult('❌ WebApp не инициализирован');
        return;
    }
    
    // Расширяем на всё окно
    tg.expand();
    
    // Показываем информацию о пользователе
    showUserInfo();
    
    // Настройка основной кнопки
    tg.MainButton.setText("✅ Готово");
    tg.MainButton.setParams({
        color: "#06811bff"
    });
    tg.MainButton.show();
    
    // Обработчик клика по основной кнопке
    tg.MainButton.onClick(() => {
        sendDataToBot('main_button_click');
    });
    
    console.log('WebApp инициализирован успешно');
    console.log('Init Data:', tg.initData);
    console.log('Platform:', tg.platform);
}

// Показываем информацию о пользователе
function showUserInfo() {
    const user = tg.initDataUnsafe.user;
    const userInfoDiv = document.getElementById('user-info');
    
    if (user) {
        userInfoDiv.innerHTML = `
            <p><strong>👤 Имя:</strong> ${user.first_name} ${user.last_name || ''}</p>
            <p><strong>🆔 ID:</strong> ${user.id}</p>
            <p><strong>📧 Username:</strong> @${user.username || 'скрыт'}</p>
        `;
    } else {
        userInfoDiv.innerHTML = '<p>Информация о пользователе недоступна</p>';
    }
}

// Правильная отправка данных в бота
function sendDataToBot(action, data = {}) {
    try {
        console.log('Попытка отправки действия:', action);
        
        const payload = {
            action: action,
            data: data,
            user_id: tg.initDataUnsafe.user?.id,
            timestamp: new Date().toISOString(),
            source: 'webapp'
        };
        
        const message = JSON.stringify(payload);
        console.log('Отправляемые данные:', message);
        
        // Проверяем доступность метода
        if (typeof tg.sendData === 'function') {
            tg.sendData(message);
            console.log('Данные отправлены через sendData()');
            
            // Закрываем приложение через секунду
            setTimeout(() => {
                if (typeof tg.close === 'function') {
                    tg.close();
                }
            }, 1000);
            
            showResult(`✅ "${action}" отправлено!`);
        } else {
            console.error('Метод sendData не доступен');
            showResult('❌ Ошибка: sendData не доступен');
        }
        
    } catch (error) {
        console.error('Ошибка отправки:', error);
        showResult('❌ Ошибка отправки данных');
    }
}

// Показать результат
function showResult(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = message;
    resultDiv.style.display = 'block';
}

// Обработчики кнопок
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, добавляем обработчики...');
    
    // Проверяем существование элементов
    const btnGame = document.getElementById("btnGame");
    const btnRandom = document.getElementById("btnRandom");
    const btnProducts = document.getElementById("btnProducts");
    
    if (btnGame) {
        btnGame.addEventListener('click', () => {
            console.log('Клик по btnGame');
            sendDataToBot('game_start', { level: 'beginner' });
        });
    }
    
    if (btnRandom) {
        btnRandom.addEventListener('click', () => {
            const randomNum = Math.floor(Math.random() * 100) + 1;
            console.log('Клик по btnRandom, число:', randomNum);
            sendDataToBot('random_number', { value: randomNum });
        });
    }
    
    if (btnProducts) {
        btnProducts.addEventListener('click', () => {
            console.log('Клик по btnProducts');
            sendDataToBot('show_products', { category: 'all' });
        });
    }
    
    // Запускаем инициализацию
    setTimeout(initApp, 100);
});
