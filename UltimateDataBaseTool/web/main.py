from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import aiohttp
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Telegram Web App")
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Отправка сообщения через бота
async def send_telegram_message(chat_id: int, text: str):
    """Отправляет сообщение через Telegram Bot API"""
    bot_token = os.getenv("BOT_TOKEN")
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json={
            "chat_id": chat_id,
            "text": text,
            "parse_mode": "HTML"
        }) as response:
            return await response.json()

# Главная страница
@app.get("/", response_class=HTMLResponse)
async def home_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# API для получения информации о пользователе
@app.get("/api/user_info")
async def get_user_info(user_id: int):
    return {
        "telegram_id": user_id,
        "message": "Это ваш Telegram ID!",
        "status": "success"
    }

# API для отправки сообщения в Telegram
@app.post("/api/send_message")
async def send_message(chat_id: int = Form(...), text: str = Form(...)):
    result = await send_telegram_message(chat_id, text)
    return {"status": "success", "result": result}
@app.get("/test-telegram")
async def test_telegram(request: Request):
    """Страница для тестирования Telegram WebApp"""
    return templates.TemplateResponse("test_telegram.html", {"request": request})
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
