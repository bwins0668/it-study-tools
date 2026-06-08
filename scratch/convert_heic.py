import os
import sys
from PIL import Image

try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
except ImportError:
    print("pillow-heif is not installed.")
    sys.exit(1)

heic_files = [
    "Weixin Image_20260604155812_84_46.heic",
    "Weixin Image_20260604155814_85_46.heic",
    "Weixin Image_20260604155816_86_46.heic",
    "Weixin Image_20260604155819_87_46.heic"
]

for hf in heic_files:
    if os.path.exists(hf):
        png_name = hf.replace(".heic", ".png")
        print(f"Converting {hf} -> {png_name}...")
        try:
            image = Image.open(hf)
            image.save(png_name, "PNG")
            print(f"Successfully saved to {png_name}")
        except Exception as e:
            print(f"Failed to convert {hf}: {e}")
    else:
        print(f"File {hf} not found.")
