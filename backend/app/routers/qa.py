from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import QueryRequest, QueryResponse, HistoryResponse
from app.services.llm import get_llm_service
import uuid
from datetime import datetime

router = APIRouter(
    prefix="/api/v1/qa",
    tags=["Q&A"],
    responses={404: {"description": "Not found"}},
)

# In-memory storage for query history (would use a database in production)
query_history = {}

@router.post("/query", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    """
    Process a user query and return an LLM-generated response
    """
    try:
        # Get LLM service
        llm_service = get_llm_service()

        # Process query with LLM
        response = await llm_service.generate_response(request.query)

        # Generate history ID if not provided
        history_id = request.history_id or str(uuid.uuid4())

        # Store in history
        if history_id not in query_history:
            query_history[history_id] = []

        query_history[history_id].append({
            "id": str(uuid.uuid4()),
            "query": request.query,
            "response": response,
            "timestamp": datetime.now().isoformat()
        })

        return QueryResponse(
            response=response,
            history_id=history_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")

@router.get("/history/{history_id}", response_model=HistoryResponse)
async def get_history(history_id: str):
    """
    Get query history for a specific history ID
    """
    if history_id not in query_history:
        raise HTTPException(status_code=404, detail="History not found")

    return HistoryResponse(history=query_history[history_id])
