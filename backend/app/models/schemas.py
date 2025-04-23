from pydantic import BaseModel, Field
from typing import List, Optional

class QueryRequest(BaseModel):
    query: str = Field(..., min_length=2, max_length=2000)
    history_id: Optional[str] = None

    model_config = {
        "json_schema_extra": {  # Changed from schema_extra to json_schema_extra
            "examples": [  # Changed from example to examples
                {
                    "query": "What documents do I need to travel from Kenya to Ireland?",
                    "history_id": None
                }
            ]
        }
    }

class QueryResponse(BaseModel):
    response: str
    history_id: str

    model_config = {
        "json_schema_extra": {  # Changed from schema_extra to json_schema_extra
            "examples": [  # Changed from example to examples
                {
                    "response": "To travel from Kenya to Ireland, you need the following documents:\n\n1. Valid passport...",
                    "history_id": "abc123"
                }
            ]
        }
    }

class ErrorResponse(BaseModel):
    message: str

class HistoryItem(BaseModel):
    id: str
    query: str
    response: str
    timestamp: str

class HistoryResponse(BaseModel):
    history: List[HistoryItem]
