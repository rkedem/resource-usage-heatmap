# Resource Usage Heatmap System

## Project Overview
The Resource Usage Heatmap System is a full-stack web application designed to collect, analyze, and visualize time-based resource usage data. The system transforms raw usage logs into aggregated heatmaps that display intensity of use across different time intervals such as hourly, daily, and weekly. The goal is to help identify peak usage periods, underutilized resources, and long-term usage trends.


## Problem Statement
Organizations that manage shared resources such as rooms, equipment, lab stations, or digital systems often lack visibility into:

- When resources are most used  
- Which resources are underutilized  
- Whether demand patterns are changing over time  

Without this information, resource allocation decisions are often inefficient. This project addresses that gap by providing a structured, data-driven visualization system.

## Target Use Cases
Example use cases include:

- A school analyzing study room usage  
- A department analyzing equipment checkout patterns  
- A workspace analyzing meeting room demand  
- A lab tracking equipment utilization  

The system can be adapted to multiple environments because it focuses on general resource usage modeling.

## Core Features
### Resource Management
- Create and categorize resources  
- Assign metadata (location, capacity, type)  

### Usage Logging
- Record timestamped usage events  
- Store start and end times  
- Associate usage with specific resources  

### Time-Based Aggregation
- Group usage into time buckets (hour/day/week)  
- Calculate usage intensity per bucket  
- Normalize across resources for fair comparison  

### Heatmap Visualization
- Color-coded grid representing usage density  
- Adjustable time ranges  
- Side-by-side resource comparison  

### Analytics Panel
- Peak usage detection  
- Underutilization detection  
- Trend summaries  

## Tech Stack
Frontend:
- React
- React Router
- CSS3
- React Icons

Backend:
- Node.js
- Express

Database:
- PostgreSQL

## Project Structure
resource-usage-heatmap
 ┣ client   # React frontend
 ┣ server   # Express backend
 ┗ README.md

## Data Flow
1. User selects resource and time range
2. Frontend sends request to backend
3. Backend retrieves raw usage logs
4. Backend aggregates into time buckets
5. Backend computes intensity metrics
6. Backend returns structured dataset
7. Frontend renders heatmap

## Frontend Features
- Interactive dashboard interface
- Resource usage heatmap visualization
- Analytics summary cards
- Responsive design for desktop and mobile
- Resource management page
- Usage logging form
- Professional UI with hover animations and gradients

## Future Improvements
- Real-time usage tracking
- Authentication and role-based access
- Export analytics reports
- Advanced filtering and search
- Live database integration with dynamic analytics

## Docker Support

A Docker image for the backend server is available on Docker Hub:

https://hub.docker.com/r/naamsewa2020/resource-usage-heatmap-backend

This allows the backend service to be containerized and run consistently across environments.


