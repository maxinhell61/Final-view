from flask import Blueprint, request, jsonify
from app.models import db, Product
from flask_jwt_extended import jwt_required, get_jwt_identity



import os
from flask import request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from app import app, db
from app.models import Product
from flask_jwt_extended import jwt_required
from flask import send_from_directory


product_bp = Blueprint('product', __name__)


UPLOAD_FOLDER = os.path.abspath(os.path.join(app.root_path,'img'))
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER







# Get all products
@product_bp.route('/get_all_products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200



# @product_bp.route('/get_all_products', methods=['GET'])
# def get_products():
#     products = Product.query.all()
#     return jsonify([product.to_dict() for product in products]), 200

# Get a single product by ID
@product_bp.route('/get_product/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product.to_dict()), 200

# Get products based on category
@product_bp.route('/category/filter', methods=['GET'])
def filter_products_by_category():
    category = request.args.get('category')
    if not category:
        return jsonify({"message": "Please provide a category to filter"}), 400
    products = Product.query.filter_by(category=category).all()
    return jsonify([product.to_dict() for product in products]), 200






from flask import request, jsonify
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename
import os
from .models import Product 
from . import db, app  

FIXED_CATEGORIES = ["Fruits", "Vegetables", "Dairy"]


@product_bp.route('/add_product', methods=['POST'])
@jwt_required()
def add_product():
    # Get form data
    name = request.form.get('name')
    description = request.form.get('description', "")
    price = request.form.get('price')
    unit = request.form.get('unit')
    stock = request.form.get('stock')
    category = request.form.get('category')
    

    # Validate required fields
    if not all([name, description, price, unit, stock, category]):
        return jsonify({"error": "Missing required fields"}), 400
    
    if category not in FIXED_CATEGORIES:
        return jsonify({"error": f"Invalid category. Choose from {FIXED_CATEGORIES}"}), 400


    # Handle image file
    image_file = request.files.get('image')
    image_url = ""

    if image_file and image_file.filename != "":
        filename = secure_filename(image_file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image_file.save(filepath)
        image_url = f"img/{filename}"  

    # Create product instance
    new_product = Product(
        name=name,
        description=description,
        price=float(price),
        unit=unit,
        stock=int(stock),
        category=category,
        image_url=image_url  # Set image URL path
    )

    # Commit to DB
    db.session.add(new_product)
    db.session.commit()

    return jsonify({
        "message": "Product added successfully",
        "product": new_product.to_dict()  # Ensure your Product model has a to_dict method
    }), 201



# Update a product (Admin Only)
@product_bp.route('/update_product/<int:id>', methods=['PUT'])
@jwt_required()
def update_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    data = request.get_json()
    
    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.unit = data.get('unit', product.unit)
    product.stock = data.get('stock', product.stock)
    product.category = data.get('category', product.category)
    product.image_url = data.get('image_url', product.image_url)


    db.session.commit()
    return jsonify({"message": "Product updated successfully"}), 200

# Delete a product (Admin Only)
@product_bp.route('/delete_product/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200

# Get product details for a card
@product_bp.route('/card/<int:product_id>', methods=['GET'])
def get_product_card(product_id):
    product = Product.query.get(product_id)
    
    if not product:
        return jsonify({'message': 'Product not found'}), 404
    
    product_card = {
        'product_id': product.id,
        'name': product.name,
        'image_url': product.image_url or "",  # Default empty string to prevent issues
        'price': product.price,
        'unit': product.unit,
        # 'discount': product.discount if product.discount is not None else 0  # Default to 0 if None
    }
    
    return jsonify(product_card), 200






@product_bp.route('/upload_image/<int:product_id>', methods=['POST'])
@jwt_required()
def upload_product_image(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"error": "Product not found"}), 404

    if 'image' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    file.save(filepath)

    product.image_url = f"img/{filename}"
    db.session.commit()

    return jsonify({
        "message": "Image uploaded successfully",
        "image_url": product.image_url
    }), 200




@app.route('/img/<filename>')
def serve_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)







# FAILED ↓
           

# @product_bp.route('/upload_images_bulk', methods=['POST'])
# @jwt_required()
# def upload_images_bulk():
#     updated_images = {}
    
#     for key in request.files:
#         if not key.startswith("product_"):
#             continue  

#         try:
#             product_id = int(key.split("_")[1])
#         except Exception as e:
#             continue  

#         file = request.files[key]
#         if file.filename == '':
#             continue  

#         filename = secure_filename(file.filename)
#         filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         file.save(filepath)
        
#         image_url = f"img/{filename}"
        
#         product = Product.query.get(product_id)
#         if product:
#             product.image_url = image_url
#             updated_images[product_id] = image_url

#     db.session.commit()

#     return jsonify({
#         "message": "Bulk image upload successful",
#         "updated_images": updated_images
#     }), 200

