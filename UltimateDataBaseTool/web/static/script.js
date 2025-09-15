// Инициализация Telegram WebApp
function initTelegramWebApp() {
    // Проверяем, находимся ли мы в Telegram
    if (window.Telegram && window.Telegram.WebApp) {
        console.log("✅ Telegram WebApp SDK загружен");
        return window.Telegram.WebApp;
    }
    
    // Если не в Telegram, создаем заглушку для разработки
    console.log("⚠️  Не в Telegram, создаем заглушку");
    
    window.Telegram = {
        WebApp: {
            initDataUnsafe: {
                user: {
                    id: 123456789,
                    first_name: "Test",
                    last_name: "User", 
                    username: "testuser",
                    language_code: "ru"
                }
            },
            sendData: function(data) {
                console.log("📤 SendData (заглушка):", data);
                // Для теста - имитируем успешную отправку
                return true;
            },
            expand: function() {
                console.log("📱 Expand (заглушка)");
            },
            showPopup: function(params) {
                console.log("📝 ShowPopup (заглушка):", params);
                alert(params.title + ": " + params.message);
            },
            close: function() {
                console.log("❌ Close (заглушка)");
            },
            MainButton: {
                setText: function(text) {
                    console.log("🔘 MainButton.setText:", text);
                },
                setParams: function(params) {
                    console.log("🔘 MainButton.setParams:", params);
                },
                show: function() {
                    console.log("🔘 MainButton.show");
                },
                hide: function() {
                    console.log("🔘 MainButton.hide");
                },
                onClick: function(callback) {
                    console.log("🔘 MainButton.onClick");
                }
            },
            version: "7.8",
            platform: "web"
        }
    };
    
    return window.Telegram.WebApp;
}

// Глобальные переменные
const tg = initTelegramWebApp();
let isTelegram = false;

// Инициализация приложения
function initApp() {
    console.log("🟢 Инициализация приложения...");
    
    // Проверяем, в Telegram ли мы
    isTelegram = !!(window.Telegram && window.Telegram.WebApp);
    
    if (isTelegram) {
        // Настоящий Telegram WebApp
        tg.expand();
        document.getElementById('status').textContent = "✅ Подключен к Telegram";
        showUserInfo();
    } else {
        // Режим разработки
        document.getElementById('status').textContent = "⚠️ Режим разработки (не в Telegram)";
        showUserInfo();
    }
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
            <p><strong>🌐 Язык:</strong> ${user.language_code || 'не указан'}</p>
            <p><strong>🔗 В Telegram:</strong> ${isTelegram ? '✅ Да' : '❌ Нет'}</p>
        `;
    } else {
        userInfoDiv.innerHTML = '<p>Информация о пользователе недоступна</p>';
    }
}

// Показать Telegram ID
function showTelegramId() {
    const user = tg.initDataUnsafe.user;
    
    if (user) {
        showResult(`✅ Ваш Telegram ID: ${user.id}`);
        tg.showPopup({
            title: "Ваш ID",
            message: `Ваш Telegram ID: ${user.id}`
        });
    } else {
        showResult("❌ Информация о пользователе недоступна");
    }
}

// Отправить тестовое сообщение
function sendTestMessage() {
    const user = tg.initDataUnsafe.user;
    
    if (!user) {
        showResult("❌ Пользователь не определен");
        return;
    }

    showResult("🔄 Отправка сообщения...");
    
    // Отправляем данные в бота
    const success = tg.sendData(JSON.stringify({
        action: "test_message",
        user_id: user.id,
        message: "Привет из веб-приложения!",
        timestamp: new Date().toISOString()
    }));
    
    if (success) {
        showResult("✅ Сообщение отправлено!");
        tg.showPopup({
            title: "Успех!",
            message: "Сообщение отправлено в бота"
        });
    } else {
        showResult("❌ Ошибка отправки сообщения");
    }
}

// Показать результат
function showResult(message) {
    document.getElementById('result').textContent = message;
}

// Запускаем приложение при загрузке
document.addEventListener('DOMContentLoaded', initApp);
