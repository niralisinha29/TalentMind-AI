from enum import Enum
from typing import Dict, Any
from pydantic import BaseModel


class TaskStatus(str, Enum):
    PENDING = "PENDING"
    RUNNING = "RUNNING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"


class Task(BaseModel):

    task_id: str

    assigned_agent: str

    description: str

    priority: str = "MEDIUM"

    status: TaskStatus = TaskStatus.PENDING

    input_data: Dict[str, Any]