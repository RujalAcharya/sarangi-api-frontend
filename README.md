## Project Setup

This project consists of two main components:

* API: Backend powered by FastAPI.
* Frontend: Frontend powered by Bun.

### Folder Structure

```
folder/
├── api/         # Backend application
│   ├── main.py  # Entry point for FastAPI
│   ├── requirements.txt  # Backend dependencies
├── frontend/    # Frontend application
│   ├── package.json  # Contains Bun dependencies and scripts
│   ├── src/     # Frontend source code
```

### Prerequisites

Ensure the following tools are installed on your system:

    Python 3.10+
    pip (Python package manager)
    Bun (JavaScript runtime) – Install Bun

### Setting Up the Project
1. **API Setup (Backend)**

    Navigate to the api directory:

```
cd folder/api
```

Create a virtual environment (optional but recommended):

```
python -m venv venv
source venv/bin/activate  # On Linux/Mac
venv\Scripts\activate     # On Windows
```

Install dependencies:

```
pip install -r requirements.txt
```

Run the FastAPI application:

```
fastapi run main.py
```

The API will be available at http://127.0.0.1:8000.
See API docs at http://127.0.0.1:8000/docs.

2. **Frontend Setup**

Navigate to the frontend directory:

```
cd folder/frontend
```

Install dependencies using Bun:

```
bun install
```

Start the frontend development server:

```
bun dev
```

The frontend will be available at http://localhost:3000 by default.

### Notes: for deployment
Make sure that ports 3000 and 8000 are available for inward traffic. Setup necessary firewall rules based on it.