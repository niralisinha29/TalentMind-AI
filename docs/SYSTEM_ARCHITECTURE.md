Overview

TalentMind AI OS follows a layered architecture inspired by modern enterprise AI systems.

Instead of tightly coupling Large Language Models with business logic, the platform separates AI reasoning, orchestration, retrieval, memory, tools, and user interaction into independent layers.

This modular architecture enables scalability, maintainability, explainability, and future expansion to multiple LLM providers and enterprise integrations.

High-Level Architecture
                         USER
                          │
                          ▼
               React Frontend (AI Workspace)
                          │
                          ▼
                 FastAPI Gateway / API Layer
                          │
                          ▼
              Chief Recruiter Agent (LangGraph)
                          │
     ┌────────────────────┼────────────────────┐
     ▼                    ▼                    ▼
Hiring Dept.       Candidate Dept.     Business Dept.
     │                    │                    │
     ▼                    ▼                    ▼
AI Employees (Agents collaborating together)
     │
     ▼
────────────────────────────────────────────────────────
                    AI Foundation Layer
────────────────────────────────────────────────────────
• LLM Gateway
• Prompt Library
• Memory
• Tool Calling
• MCP
• Evaluation
• Observability
────────────────────────────────────────────────────────
                    Intelligence Layer
────────────────────────────────────────────────────────
• RAG Pipeline
• ChromaDB
• Embeddings
• Resume Intelligence
────────────────────────────────────────────────────────
                     Data Layer
────────────────────────────────────────────────────────
• PostgreSQL
• Resume Storage
• Logs
• Configurations

Layer 1
Presentation Layer
Technology

React
Tailwind CSS

Responsibilities
Recruiter Dashboard
AI Workspace
Analytics
Reports
Hiring Timeline
Layer 2
API Gateway

Technology
FastAPI

Responsibilities
Authentication
API Management
Agent Communication
Request Validation
File Upload

Layer 3
Agent Orchestration Layer

Technology

LangGraph

Responsibilities

Agent Planning
State Management
Workflow Routing
Parallel Execution
Human Approval

This is the brain of the platform.

Layer 4
AI Employees

This layer contains specialized AI agents.

Initially

Chief Recruiter
Job Intelligence
Talent Search
Candidate Intelligence
Ranking
Interview
Communication

Future

Learning
Salary Intelligence
Compliance
Workforce Planning
Layer 5
AI Foundation Layer

Shared AI capabilities.

Instead of every agent implementing these separately.

Contains

Prompt Templates
LLM Gateway
Memory
Tool Registry
MCP Client
Evaluation Engine
Observability

This layer makes the platform modular.

Layer 6
Intelligence Layer

Contains

Resume Parser
Embeddings
ChromaDB
Semantic Search
RAG
Explainability

This is where our current hackathon logic already exists.

Layer 7
Data Layer

Contains

PostgreSQL

Stores

Recruiters
Candidates
Jobs
Feedback
Hiring History

ChromaDB

Stores

Resume Embeddings

Redis

Stores

Agent State
Memory
Sessions

File Storage

Stores

Resumes
Reports
PDFs
Design Principles

TalentMind AI OS follows the following engineering principles.

Separation of Concerns

Every AI employee performs only one responsibility.

LLM Agnostic

Gemini can be replaced with OpenAI or Claude without modifying business logic.

Explainable AI

Every recommendation must include reasoning.

Human-in-the-Loop

Critical hiring decisions always require recruiter approval.

Tool-Based AI

Agents interact with external systems through tools rather than hardcoded integrations.

Enterprise Ready

Every component should be independently scalable.