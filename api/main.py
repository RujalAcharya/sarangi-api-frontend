import base64
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydub.utils import mediainfo
import os

app = FastAPI()

# Directory containing the wav files
WAV_DIR = "../assets"

# List of allowed origins
origins = [
    "*"    # Replace with your frontend's URL
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,             # List of allowed origins
    allow_credentials=True,           # Allow cookies or Authorization headers
    allow_methods=["*"],              # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],              # Allow all HTTP headers
)

def get_wav_metadata(file_path):
    """
    Extracts metadata from a wav file using pydub's mediainfo.
    """
    info = mediainfo(file_path)
    return {
        "duration": f"{info.get('duration', 'Unknown')} seconds",
        "sample_rate": f"{info.get('sample_rate', 'Unknown')} bps",
        "channels": f"{info.get('channels', 'Unknown')}",
        "bitrate": f"{info.get('bit_rate', 'Unknown')} Hz"
    }

def encode_wav_to_base64(file_path):
    """
    Encodes a wav file to a base64 string.
    """
    with open(file_path, "rb") as wav_file:
        return base64.b64encode(wav_file.read()).decode("utf-8")

@app.get("/note/{note_name}")
async def get_note(note_name: str):
    """
    Endpoint to fetch a wav note along with its metadata.
    """
    file_name = f"{note_name}.wav"
    file_path = os.path.join(WAV_DIR, file_name)

    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="Note not found")
    
    # Fetch metadata and encode wav file
    metadata = get_wav_metadata(file_path)
    encoded_wav = encode_wav_to_base64(file_path)

    # Prepare response
    response = {
        "note": note_name,
        "metadata": metadata,
        "wav_file_base64": encoded_wav,
    }
    return JSONResponse(content=response)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
