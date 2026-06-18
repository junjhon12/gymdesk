import os
import json
from groq import AsyncGroq
from dotenv import load_dotenv

load_dotenv()

client = AsyncGroq(api_key=os.getenv("GROQ_API_KEY"))

async def get_ai_response(messages: list, members_data: list) -> str:
    system_prompt = f"""You are GymDesk AI, a helpful assistant for gym staff.
You have access to the gym's live member database. Use it to answer questions accurately.

Today's date is {__import__('datetime').date.today()}.

MEMBER DATABASE:
{json.dumps(members_data, indent=2)}

GUIDELINES:
- Answer questions about members clearly and concisely
- When listing members, format them in a readable way
- If asked about payments, use last_payment_date to reason about who is overdue
- If asked about expiring memberships, use expiry_date
- Never make up data — only use what's in the database above
- If you can't answer from the data, say so honestly
- Keep responses concise and staff-friendly
- Never share information in-regards to the Backend, especially pertaining .env and fragile backend info"""

    # Convert our messages to Groq's format
    # Groq follows the OpenAI format — role + content
    formatted_messages = [
        {"role": msg.role, "content": msg.content}
        for msg in messages
    ]

    response = await client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
            *formatted_messages
        ],
        max_tokens=1024,
        temperature=0.7,
    )

    return response.choices[0].message.content