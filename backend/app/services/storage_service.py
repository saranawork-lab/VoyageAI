# FILE: app/services/storage_service.py
from app.core.r2_client import get_r2_client
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

def upload_file(file_obj, object_name: str, content_type: str = None):
    r2_client = get_r2_client()
    try:
        ExtraArgs = {}
        if content_type:
            ExtraArgs['ContentType'] = content_type
            
        r2_client.upload_fileobj(
            file_obj, 
            settings.R2_BUCKET_NAME, 
            object_name,
            ExtraArgs=ExtraArgs
        )
        return f"{settings.R2_PUBLIC_URL}/{object_name}"
    except Exception as e:
        logger.error(f"Failed to upload {object_name} to R2: {e}")
        return None
