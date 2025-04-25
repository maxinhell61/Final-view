# import sys
# sys.path.append("..")
# from app import app, db
# from models import Product  

# products = [
#     # Fruits
#     {"name": "Apple (Shimla)", "category": "Fruits", "price": 120, "stock": 50, "unit": "kg"},
#     {"name": "Banana (Elaichi)", "category": "Fruits", "price": 50, "stock": 100, "unit": "dozen"},
#     {"name": "Mango (Alphonso)", "category": "Fruits", "price": 180, "stock": 40, "unit": "kg"},
#     {"name": "Orange (Nagpur)", "category": "Fruits", "price": 80, "stock": 70, "unit": "kg"},
#     {"name": "Papaya", "category": "Fruits", "price": 40, "stock": 60, "unit": "kg"},
#     {"name": "Pomegranate", "category": "Fruits", "price": 150, "stock": 50, "unit": "kg"},
#     {"name": "Grapes (Black)", "category": "Fruits", "price": 90, "stock": 55, "unit": "kg"},
#     {"name": "Guava (Amrud)", "category": "Fruits", "price": 60, "stock": 65, "unit": "kg"},
#     {"name": "Watermelon", "category": "Fruits", "price": 30, "stock": 45, "unit": "kg"},
#     {"name": "Lychee", "category": "Fruits", "price": 140, "stock": 30, "unit": "kg"},

#     # Vegetables
#     {"name": "Tomato", "category": "Vegetables", "price": 30, "stock": 80, "unit": "kg"},
#     {"name": "Onion", "category": "Vegetables", "price": 25, "stock": 90, "unit": "kg"},
#     {"name": "Potato", "category": "Vegetables", "price": 20, "stock": 100, "unit": "kg"},
#     {"name": "Green Chilli", "category": "Vegetables", "price": 60, "stock": 40, "unit": "kg"},
#     {"name": "Brinjal (Baingan)", "category": "Vegetables", "price": 35, "stock": 60, "unit": "kg"},
#     {"name": "Cabbage", "category": "Vegetables", "price": 28, "stock": 70, "unit": "kg"},
#     {"name": "Spinach (Palak)", "category": "Vegetables", "price": 25, "stock": 50, "unit": "bunch"},
#     {"name": "Cauliflower (Gobi)", "category": "Vegetables", "price": 40, "stock": 60, "unit": "kg"},
#     {"name": "Carrot", "category": "Vegetables", "price": 35, "stock": 55, "unit": "kg"},
#     {"name": "Lady Finger (Bhindi)", "category": "Vegetables", "price": 45, "stock": 45, "unit": "kg"},

#     # Dairy
#     {"name": "Amul Milk (500ml)", "category": "Dairy", "price": 27, "stock": 100, "unit": "pack"},
#     {"name": "Amul Butter (100g)", "category": "Dairy", "price": 52, "stock": 50, "unit": "pack"},
#     {"name": "Paneer (Fresh)", "category": "Dairy", "price": 90, "stock": 40, "unit": "250g"},
#     {"name": "Curd (Dahi)", "category": "Dairy", "price": 30, "stock": 80, "unit": "500ml"},
#     {"name": "Ghee (Cow)", "category": "Dairy", "price": 550, "stock": 25, "unit": "litre"},
#     {"name": "Cheese Slices", "category": "Dairy", "price": 85, "stock": 35, "unit": "pack"},
#     {"name": "Amul Lassi", "category": "Dairy", "price": 20, "stock": 60, "unit": "200ml"},
#     {"name": "Doodh Peda", "category": "Dairy", "price": 100, "stock": 30, "unit": "250g"},
#     {"name": "Milk Bread", "category": "Dairy", "price": 40, "stock": 45, "unit": "loaf"},
#     {"name": "Fresh Cream", "category": "Dairy", "price": 65, "stock": 30, "unit": "200ml"},
# ]

# # Insert products
# with app.app_context():
#     for item in products:
#         product = Product(
#             name=item["name"],
#             category=item["category"],
#             price=item["price"],
#             stock=item["stock"],
#             unit=item["unit"],
#             description=None,
#             image_url=None
#         )
#         db.session.add(product)

#     db.session.commit()
#     print("✔️ 30 products added to the database.")


























import sys
sys.path.append("app")  # Adjust based on actual structure

from __init__ import app, db
from models import Product

products = [
    # Fruits
    {"name": "Banana", "category": "Fruits", "price": 30, "stock": 100, "unit": "dozen", "description": "Fresh ripe bananas"},
    {"name": "Apple", "category": "Fruits", "price": 150, "stock": 80, "unit": "kg", "description": "Juicy red apples"},
    {"name": "Mango", "category": "Fruits", "price": 200, "stock": 60, "unit": "kg", "description": "Seasonal Alphonso mangoes"},
    {"name": "Grapes", "category": "Fruits", "price": 90, "stock": 70, "unit": "kg", "description": "Green seedless grapes"},
    {"name": "Papaya", "category": "Fruits", "price": 50, "stock": 40, "unit": "kg", "description": "Fresh papayas rich in enzymes"},
    {"name": "Orange", "category": "Fruits", "price": 60, "stock": 90, "unit": "kg", "description": "Juicy oranges full of vitamin C"},
    {"name": "Pineapple", "category": "Fruits", "price": 70, "stock": 50, "unit": "piece", "description": "Tropical sweet pineapples"},
    {"name": "Watermelon", "category": "Fruits", "price": 40, "stock": 30, "unit": "kg", "description": "Big juicy watermelons"},
    {"name": "Guava", "category": "Fruits", "price": 55, "stock": 45, "unit": "kg", "description": "Locally grown guavas"},
    {"name": "Pomegranate", "category": "Fruits", "price": 120, "stock": 60, "unit": "kg", "description": "Sweet red pomegranates"},

    # Vegetables
    {"name": "Tomato", "category": "Vegetables", "price": 30, "stock": 100, "unit": "kg", "description": "Fresh red tomatoes"},
    {"name": "Onion", "category": "Vegetables", "price": 25, "stock": 120, "unit": "kg", "description": "Indian kitchen essential"},
    {"name": "Potato", "category": "Vegetables", "price": 20, "stock": 150, "unit": "kg", "description": "Staple vegetable"},
    {"name": "Cabbage", "category": "Vegetables", "price": 35, "stock": 80, "unit": "piece", "description": "Fresh green cabbage"},
    {"name": "Cauliflower", "category": "Vegetables", "price": 40, "stock": 60, "unit": "piece", "description": "Organic cauliflower heads"},
    {"name": "Carrot", "category": "Vegetables", "price": 45, "stock": 70, "unit": "kg", "description": "Crunchy red carrots"},
    {"name": "Brinjal", "category": "Vegetables", "price": 30, "stock": 50, "unit": "kg", "description": "Locally grown brinjals"},
    {"name": "Bottle Gourd", "category": "Vegetables", "price": 25, "stock": 40, "unit": "piece", "description": "Soft green lauki"},
    {"name": "Spinach", "category": "Vegetables", "price": 20, "stock": 30, "unit": "bunch", "description": "Fresh leafy spinach"},
    {"name": "Lady Finger", "category": "Vegetables", "price": 50, "stock": 60, "unit": "kg", "description": "Tender green bhindi"},

    # Dairy
    {"name": "Milk", "category": "Dairy", "price": 60, "stock": 100, "unit": "litre", "description": "Fresh cow milk"},
    {"name": "Butter", "category": "Dairy", "price": 200, "stock": 40, "unit": "pack", "description": "Amul salted butter"},
    {"name": "Cheese", "category": "Dairy", "price": 250, "stock": 30, "unit": "pack", "description": "Processed cheese slices"},
    {"name": "Curd", "category": "Dairy", "price": 50, "stock": 80, "unit": "litre", "description": "Homemade thick curd"},
    {"name": "Paneer", "category": "Dairy", "price": 300, "stock": 40, "unit": "kg", "description": "Soft and fresh paneer"},
    {"name": "Ghee", "category": "Dairy", "price": 600, "stock": 30, "unit": "litre", "description": "Pure desi ghee"},
    {"name": "Condensed Milk", "category": "Dairy", "price": 150, "stock": 20, "unit": "can", "description": "Sweetened condensed milk"},
    {"name": "Flavored Yogurt", "category": "Dairy", "price": 80, "stock": 50, "unit": "cup", "description": "Mango-flavored yogurt"},
    {"name": "Margarine", "category": "Dairy", "price": 180, "stock": 20, "unit": "pack", "description": "Non-dairy butter substitute"},
    {"name": "Whipping Cream", "category": "Dairy", "price": 350, "stock": 25, "unit": "litre", "description": "For cakes and desserts"},
]

# Insert into database
with app.app_context():
    for item in products:
        product = Product(
            name=item["name"],
            category=item["category"],
            price=item["price"],
            stock=item["stock"],
            unit=item["unit"],
            description=item["description"],
            image_url=None
        )
        db.session.add(product)

    db.session.commit()
    print("✅ Products with descriptions added successfully!")
