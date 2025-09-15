// Добавьте в самое начало script.js
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
                    username: "testuser"
                }
            },
            sendData: function(data) {
                console.log("📤 SendData (заглушка):", data);
            },
            expand: function() {
                console.log("📱 Expand (заглушка)");
            },
            showPopup: function(params) {
                console.log("📝 ShowPopup (заглушка):", params);
            },
            MainButton: {
                setText: function(text) {
                    console.log("🔘 MainButton.setText:", text);
                },
                show: function() {
                    console.log("🔘 MainButton.show");
                },
                hide: function() {
                    console.log("🔘 MainButton.hide");
                }
            }
        }
    };
    
    return window.Telegram.WebApp;
}

// Инициализируем сразу
const tg = initTelegramWebApp();
