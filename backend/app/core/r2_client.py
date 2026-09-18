# FILE: app/core/r2_client.py
import boto3
from botocore.config import Config
from app.core.config import settings

r2_client = None

def init_r2():
    global r2_client
    r2_client = boto3.client(
        's3',
        endpoint_url=settings.R2_ENDPOINT_URL,
        aws_access_key_id=settings.R2_ACCESS_KEY_ID,
        aws_secret_access_key=settings.R2_SECRET_ACCESS_KEY,
        config=Config(signature_version='s3v4'),
        region_name='auto' # Cloudflare R2 requires region to be 'auto' or unspecified
    )

def get_r2_client():
    return r2_client
