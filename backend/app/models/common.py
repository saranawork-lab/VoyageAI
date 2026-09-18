# FILE: app/models/common.py
from typing import Annotated, Any
from pydantic import BeforeValidator

# Converts ObjectId to string for Pydantic v2
PyObjectId = Annotated[str, BeforeValidator(lambda x: str(x) if x else None)]
