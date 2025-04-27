import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()

# Get Cloudinary credentials
cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
api_key = os.getenv('CLOUDINARY_API_KEY')
api_secret = os.getenv('CLOUDINARY_API_SECRET')

# Print debug info
print(f"Cloudinary Config - Cloud Name: {cloud_name}, API Key: {api_key[:4]}... (keys loaded: {bool(cloud_name and api_key and api_secret)})")

# Configure Cloudinary
cloudinary.config(
    cloud_name=cloud_name,
    api_key=api_key,
    api_secret=api_secret
)

def upload_file(file, folder="medicare"):
    """
    Uploads a file to Cloudinary and returns the secure URL.

    :param file: Path to the file (string) or file-like object
    :param folder: Folder name in Cloudinary (optional, default: "medicare")
    :return: Secure URL of the uploaded file
    """
    try:
        # Handle both file paths (string) and file-like objects
        response = cloudinary.uploader.upload(file, folder=folder)
        return response["secure_url"]
    except Exception as e:
        print(f"Upload error: {str(e)}")
        return str(e)