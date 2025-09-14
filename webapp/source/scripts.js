// Основной объект Telegram Web App
const tg = window.Telegram.WebApp;

const btn_game = document.getElementById("btnGame")


// Инициализация приложения
function initApp() {
    // Расширяем на всё окно
    tg.expand();
    
    // Показываем информацию о пользователе
    showUserInfo();
    
    // Можно менять цвет кнопки
    tg.MainButton.setParams({
        text: "✅ Готово",
        color: "#06811bff"
    });
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

// Отправка данных в бота
function sendData(action) {
    tg.sendData(JSON.stringify({
        action: action,
        timestamp: new Date().toISOString(),
        user_id: tg.initDataUnsafe.user?.id
    }));
    
    showResult(`✅ Действие "${action}" отправлено!`);
}

// Генерация случайного числа
function getRandomNumber() {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    showResult(`🎯 Случайное число: ${randomNum}`);
    
    // Можно отправить и в бота
    tg.sendData(JSON.stringify({
        action: 'random_number',
        number: randomNum
    }));
}

// Показать результат
function showResult(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = message;
    resultDiv.style.animation = 'none';
    setTimeout(() => {
        resultDiv.style.animation = 'fadeIn 0.3s ease-out';
    }, 10);
}

// Обработчики событий Telegram
tg.onEvent('themeChanged', () => {
    // Перезагружаем при изменении темы
    document.body.className = tg.colorScheme;
});

tg.onEvent('viewportChanged', () => {
    // Адаптируемся к изменению размера
    console.log('Viewport changed:', tg.viewportHeight);
});

// Отправка данных в бота
function sendDataToBot(action, data = {}) {
    const message = JSON.stringify({
        action: action,
        data: data,
        user: tg.initDataUnsafe.user,
        timestamp: new Date().toISOString()
    });
    
    // Эта строка отправляет данные в бота!
    tg.sendData(message);
    
    // Можно закрыть веб-приложение после отправки
    // tg.close();
}

// Пример использования
function handleButtonClick() {
    sendDataToBot('button_clicked', {
        button_name: 'test_button',
        value: '123'
    });
}
// Обновленные обработчики кнопок
document.getElementById('btnGame').addEventListener('click', () => {
    sendDataToBot('game_start');
    showResult('🎮 Игра запускается...');
});

document.getElementById('btnRandom').addEventListener('click', () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    sendDataToBot('random_number', { value: randomNum });
    showResult(`🎯 Число: ${randomNum} (отправлено боту)`);
});

document.getElementById('btnProducts').addEventListener('click', () => {
    sendDataToBot('show_products');
    showResult('🛒 Запрос товаров отправлен');
});
// Запускаем приложение когда всё загружено
document.addEventListener('DOMContentLoaded', initApp);