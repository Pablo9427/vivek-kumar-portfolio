import os
from PIL import Image, ImageDraw

output_dir = os.path.join("assets", "images")
os.makedirs(output_dir, exist_ok=True)

WIDTH, HEIGHT = 400, 260

def create_dramatic_canvas():
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    # Dark slate background with a glowing cyan border
    draw.rounded_rectangle([10, 10, WIDTH - 10, HEIGHT - 10], radius=20, fill=(15, 23, 42, 245), outline=(56, 189, 248), width=3)
    return img, draw

def draw_pdf_badge(draw, x, y):
    """Draws a crisp, professional PDF document emblem."""
    draw.rounded_rectangle([x, y, x + 60, y + 26], radius=6, fill=(239, 68, 68), outline=(255, 255, 255), width=2)
    draw.line([x + 10, y + 9, x + 50, y + 9], fill=(255, 255, 255), width=3)
    draw.line([x + 10, y + 17, x + 40, y + 17], fill=(255, 255, 255), width=3)

# 1. CATALOGUE DOODLE: 3D Open Spec Book with Grid Overlays
def make_catalogue_doodle():
    img, draw = create_base_canvas() if 'create_base_canvas' in globals() else create_dramatic_canvas()
    
    # 3D Book Layout
    draw.rounded_rectangle([60, 50, 320, 200], radius=12, fill=(30, 41, 59), outline=(56, 189, 248), width=3)
    draw.line([190, 50, 190, 200], fill=(56, 189, 248), width=3) # Book spine
    
    # Left Page Graphic Content
    draw.rectangle([80, 70, 170, 120], fill=(2, 132, 199))
    for y in range(135, 185, 12):
        draw.line([80, y, 170, y], fill=(148, 163, 184), width=3)
        
    # Right Page Color Palette Swatches & Grid Lines
    swatches = [(239, 68, 68), (245, 158, 11), (16, 185, 129), (56, 189, 248)]
    for i, color in enumerate(swatches):
        draw.rectangle([210 + (i * 24), 70, 228 + (i * 24), 90], fill=color)
    for y in range(105, 185, 12):
        draw.line([210, y, 300, y], fill=(148, 163, 184), width=3)

    draw_pdf_badge(draw, 310, 25)
    img.save(os.path.join(output_dir, "doodle_catalogue.png"))
    print("Generated: doodle_catalogue.png")

# 2. PACKAGING DOODLE: Precision 3D Die-Line & Blueprint Grid
def make_packaging_doodle():
    img, draw = create_dramatic_canvas()
    
    # Blueprint Grid Lines
    for x in range(30, 370, 25):
        draw.line([x, 20, x, 240], fill=(30, 58, 138, 100), width=1)
    for y in range(20, 240, 25):
        draw.line([30, y, 370, y], fill=(30, 58, 138, 100), width=1)
        
    # 3D Isometric Packaging Box
    draw.polygon([(140, 110), (220, 60), (300, 110), (300, 190), (220, 230), (140, 190)], fill=(245, 158, 11), outline=(255, 255, 255), width=3)
    draw.line([(220, 60), (220, 230)], fill=(217, 119, 6), width=3)
    draw.line([(140, 110), (220, 150), (300, 110)], fill=(217, 119, 6), width=3)

    # Die-Line Dimension Markings
    draw.line([100, 60, 100, 190], fill=(56, 189, 248), width=2)
    draw.line([93, 60, 107, 60], fill=(56, 189, 248), width=2)
    draw.line([93, 190, 107, 190], fill=(56, 189, 248), width=2)

    draw_pdf_badge(draw, 310, 25)
    img.save(os.path.join(output_dir, "doodle_packaging.png"))
    print("Generated: doodle_packaging.png")

# 3. VECTOR DOODLE: Bezier Curves, Pen Tool Handles & Anchor Nodes
def make_vector_doodle():
    img, draw = create_dramatic_canvas()
    
    # Dramatic Bezier Vector Arc Lines
    draw.arc([60, 50, 320, 210], start=180, end=360, fill=(56, 189, 248), width=6)
    draw.arc([100, 90, 360, 230], start=0, end=180, fill=(236, 72, 153), width=6)
    
    # Anchor Handle Control Lines
    draw.line([120, 50, 260, 50], fill=(245, 158, 11), width=2)
    draw.rectangle([115, 45, 125, 55], fill=(255, 255, 255), outline=(245, 158, 11), width=2)
    draw.rectangle([255, 45, 265, 55], fill=(255, 255, 255), outline=(245, 158, 11), width=2)
    
    # Vector Pen Nib
    draw.polygon([(190, 130), (210, 110), (250, 150), (230, 170)], fill=(241, 245, 249), outline=(56, 189, 248), width=2)
    draw.polygon([(190, 130), (175, 120), (185, 140)], fill=(56, 189, 248))

    draw_pdf_badge(draw, 310, 25)
    img.save(os.path.join(output_dir, "doodle_vector.png"))
    print("Generated: doodle_vector.png")

# 4. PHOTOSHOP DOODLE 1: Photo Layers, Magic Wand Sparkles & Adjustment Masks
def make_photoshop_doodle():
    img, draw = create_dramatic_canvas()
    
    # Stacked Design Layers
    draw.rounded_rectangle([120, 100, 310, 200], radius=10, fill=(30, 41, 59), outline=(148, 163, 184), width=2)
    draw.rounded_rectangle([100, 80, 290, 180], radius=10, fill=(15, 23, 42), outline=(168, 85, 247), width=3)
    
    # Layer Composition Content
    draw.ellipse([210, 95, 250, 135], fill=(250, 204, 21)) # Lighting adjustment
    draw.polygon([(120, 160), (180, 100), (230, 160)], fill=(56, 189, 248))
    draw.polygon([(180, 160), (230, 115), (270, 160)], fill=(236, 72, 153))

    # Magic Wand Selection Tool
    draw.line([70, 60, 140, 120], fill=(255, 255, 255), width=5)
    draw.polygon([(140, 120), (150, 110), (155, 125)], fill=(250, 204, 21))
    
    # Magic Burst Particles
    draw.ellipse([160, 100, 170, 110], fill=(168, 85, 247))
    draw.ellipse([145, 85, 153, 93], fill=(56, 189, 248))

    draw_pdf_badge(draw, 310, 25)
    img.save(os.path.join(output_dir, "doodle_photoshop.png"))
    print("Generated: doodle_photoshop.png")

# 5. MOCKUP DOODLE: Realistic 3D Textile Bed Setup & Pattern Mapping
def make_mockup_doodle():
    img, draw = create_dramatic_canvas()
    
    # 3D Bedroom Bed Perspective Frame
    draw.rounded_rectangle([100, 110, 310, 200], radius=14, fill=(30, 58, 138), outline=(56, 189, 248), width=3)
    
    # Textile Pattern Bed Sheet Overlay
    draw.rounded_rectangle([110, 125, 300, 190], radius=10, fill=(244, 114, 182))
    # Pattern fold contours
    for x in range(120, 290, 20):
        draw.line([x, 125, x + 10, 190], fill=(219, 39, 119), width=3)
        
    # Hotel Pillows
    draw.rounded_rectangle([120, 85, 190, 115], radius=8, fill=(255, 255, 255), outline=(148, 163, 184), width=2)
    draw.rounded_rectangle([220, 85, 290, 115], radius=8, fill=(255, 255, 255), outline=(148, 163, 184), width=2)

    draw_pdf_badge(draw, 310, 25)
    img.save(os.path.join(output_dir, "doodle_mockup.png"))
    print("Generated: doodle_mockup.png")

# Execute all generators
make_catalogue_doodle()
make_packaging_doodle()
make_vector_doodle()
make_photoshop_doodle()
make_mockup_doodle()

print("\nAll 5 Realistic Symbol Doodles generated successfully!")