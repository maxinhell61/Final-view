from flask import Blueprint, request, jsonify,send_from_directory
from app.models import db, Product
import os
from werkzeug.utils import secure_filename
from app import app, db
from flask_jwt_extended import jwt_required


product_bp = Blueprint('product', __name__)


UPLOAD_FOLDER = os.path.abspath(os.path.join(app.root_path,'img'))
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER



# Get all products
@product_bp.route('/get_all_products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

# Get a single product by ID
@product_bp.route('/get_product/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product.to_dict()), 200

from sqlalchemy.sql.expression import func

@product_bp.route('/get_random_products', methods=['GET'])
def get_random_products():
    products = Product.query.order_by(func.random()).limit(10).all()
    return jsonify([product.to_dict() for product in products]), 200



# Get products based on category
@product_bp.route('/category/filter', methods=['GET'])
def filter_products_by_category():
    category = request.args.get('category')
    if not category:
        return jsonify({"message": "Please provide a category to filter"}), 400
    products = Product.query.filter_by(category=category).all()
    return jsonify([product.to_dict() for product in products]), 200

FIXED_CATEGORIES = ["Fruits", "Vegetables", "Dairy"]


@product_bp.route('/add_product', methods=['POST'])
@jwt_required()
def add_product():
    data = request.get_json()

    # Extract fields from JSON
    name = data.get('name')
    description = data.get('description', "")
    price = data.get('price')
    unit = data.get('unit')
    stock = data.get('stock')
    category = data.get('category')

    # Validate required fields
    if not all([name, price, unit, stock, category]):
        return jsonify({"error": "Missing required fields"}), 400

    if category not in FIXED_CATEGORIES:
        return jsonify({"error": f"Invalid category. Choose from {FIXED_CATEGORIES}"}), 400

    try:
        price = float(price)
        stock = int(stock)
    except ValueError:
        return jsonify({"error": "Price must be a float and stock must be an integer"}), 400

    # Create product instance (no image)
    new_product = Product(
        name=name,
        description=description,
        price=price,
        unit=unit,
        stock=stock,
        category=category,
        image_url=""  
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify({
        "message": "Product added successfully",
        "product": new_product.to_dict()
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





