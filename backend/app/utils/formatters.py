# FILE: app/utils/formatters.py
from datetime import datetime

def format_inr(amount_paise: int) -> str:
    """Formats an amount in paise to an INR string with commas."""
    rupees = amount_paise / 100
    # Simple Indian locale formatting trick
    s, *d = str(rupees).partition(".")
    r = ",".join([s[x-2:x] for x in range(-3, -len(s), -2)][::-1] + [s[-3:]])
    return f"₹{r}{d[0]}{d[1]}" if r else f"₹{s}{d[0]}{d[1]}"

def format_date(dt: datetime) -> str:
    """Formats a datetime object to a readable string."""
    return dt.strftime("%d %b %Y, %I:%M %p")
