import os
import asyncio
from aiogram import Bot, Dispatcher
from aiogram.types import Message
from aiogram.filters import Command
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from dotenv import load_dotenv

# Загружаем переменные окружения
load_dotenv()

bot = Bot(
    token=os.getenv("BOT_TOKEN"),
    default=DefaultBotProperties(parse_mode=ParseMode.HTML)
)
dp = Dispatcher()

@dp.message(Command("start"))
async def cmd_start(message: Message):
    await message.answer("🚀 Бот работает на Render!")

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())