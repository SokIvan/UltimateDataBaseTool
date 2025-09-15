import os

from supabase import create_client, Client

class Database:
    def __init__(self):
        self.supabase: Client = create_client(
            os.getenv("SUPABASE_URL"),
            os.getenv("SUPABASE_KEY")
        )
    
    async def add_user(self, user_id: int, username: str):
        """Добавляет пользователя в базу"""
        response = await self.supabase.table("users").insert({
            "telegram_id": user_id,
            "username": username
        }).execute()
        
        return response.data[0] if response.data else None
    
    async def get_user(self, user_id: int):
        """Получает пользователя по ID"""
        response = await self.supabase.table("users").select("*").eq("telegram_id", user_id).execute()
        return response.data[0] if response.data else None
    
    async def get_all_users(self):
        """Получает всех пользователей"""
        response = await self.supabase.table("users").select("*").execute()
        return response.data

# Инициализация базы
db = Database()