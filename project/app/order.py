
# from flask import Blueprint, request, jsonify
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from datetime import datetime
# from app.models import db, Order, User

# order_bp = Blueprint('order', __name__)



# # Get Order Status

# @order_bp.route('/order/status/<int:order_id>', methods=['GET'])
# @jwt_required()
# def get_order_status(order_id):
#     user_id = get_jwt_identity()
#     order = Order.query.filter_by(id=order_id, user_id=user_id).first()
#     if not order:
#         return jsonify({"error": "Order not found"}), 404

#     # If updated_at is not available, remove this field from response
#     last_updated = order.updated_at.strftime("%Y-%m-%d %H:%M:%S") if hasattr(order, 'updated_at') and order.updated_at else "N/A"
    
#     return jsonify({
#         "order_id": order.id,
#         "status": order.status,
#         "last_updated": last_updated
#     }), 200


# @order_bp.route('/order/status/update', methods=['POST'])
# @jwt_required()
# def update_order_status():
#     data = request.get_json()
#     order_id = data.get("order_id")
#     new_status = data.get("status")

#     if not order_id or not new_status:
#         return jsonify({"error": "Order ID and new status are required"}), 400

#     # Restrict to admin users only
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)
#     if not user or user.role != "admin":
#         return jsonify({"error": "Unauthorized"}), 403

#     order = Order.query.filter_by(id=order_id).first()
#     if not order:
#         return jsonify({"error": "Order not found"}), 404

#     order.status = new_status
#     if hasattr(order, 'updated_at'):
#         order.updated_at = datetime.utcnow()
#     db.session.commit()

#     return jsonify({"message": f"Order {order_id} status updated to {new_status}"}), 200



# @order_bp.route('/order/webhook/payment', methods=['POST'])
# def payment_webhook():
#     data = request.get_json()
#     order_id = data.get("order_id")
#     payment_status = data.get("payment_status")

#     if not order_id or not payment_status:
#         return jsonify({"error": "Order ID and payment status are required"}), 400

#     order = Order.query.filter_by(id=order_id).first()
#     if not order:
#         return jsonify({"error": "Order not found"}), 404

#     if payment_status.lower() == "success":
#         order.status = "Paid"
#     else:
#         order.status = "Payment Failed"

#     if hasattr(order, 'updated_at'):
#         order.updated_at = datetime.utcnow()
#     db.session.commit()

#     return jsonify({"message": f"Order {order_id} updated based on payment status: {payment_status}"}), 200























# ---------------------------------------

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Order,User
from app import db

order_bp = Blueprint("order", __name__, url_prefix="/orders")
# Place Order
@order_bp.route("/place", methods=["POST"])
@jwt_required()
def place_order():
    user_id = get_jwt_identity()
    data = request.get_json()

    if not data or "products" not in data or "total_price" not in data or "payment_mode" not in data:
        return jsonify({"error": "Invalid order data"}), 400

    delivery_boy_id = data.get("delivery_boy_id")  # optional field

    if delivery_boy_id:
        delivery_boy = User.query.get(delivery_boy_id)
        if not delivery_boy or delivery_boy.role != "delivery":
            return jsonify({"error": "Invalid delivery boy ID"}), 400
    else:
        delivery_boy_id = None  # Assign later

    new_order = Order(
        user_id=user_id,
        products=data["products"],
        total_price=data["total_price"],
        payment_mode=data["payment_mode"],
        delivery_boy_id=delivery_boy_id
    )

    db.session.add(new_order)
    db.session.commit()

    return jsonify({"message": "Order placed successfully", "order_id": new_order.id}), 201


# Assign Delivery Boy to Order (Admin Only)
@order_bp.route("/assign_delivery_boy/<int:order_id>", methods=["PUT"])
@jwt_required()
def assign_delivery_boy(order_id):
    user_id = get_jwt_identity()
    admin = User.query.get(user_id)

    if admin.role != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404

    data = request.get_json()
    delivery_boy_id = data.get("delivery_boy_id")

    if not delivery_boy_id:
        return jsonify({"error": "Delivery boy ID is required"}), 400

    delivery_boy = User.query.get(delivery_boy_id)
    if not delivery_boy or delivery_boy.role != "delivery_boy":
        return jsonify({"error": "Invalid delivery boy"}), 400

    order.delivery_boy_id = delivery_boy_id
    db.session.commit()

    return jsonify({
        "message": f"Delivery boy '{delivery_boy.name}' assigned to order {order.id}",
        "order": order.to_dict()
    }), 200



# Get User Orders
@order_bp.route("/userorder", methods=["GET"])
@jwt_required()
def get_user_orders():
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    
    return jsonify([order.to_dict() for order in orders]), 200


# Get Order Details
@order_bp.route("/<int:order_id>", methods=["GET"])
@jwt_required()
def get_order_details(order_id):
    user_id = get_jwt_identity()
    order = Order.query.filter_by(id=order_id, user_id=user_id).first()

    if not order:
        return jsonify({"error": "Order not found"}), 404

    return jsonify(order.to_dict()), 200


# Cancel Order
@order_bp.route("/cancel/<int:order_id>", methods=["DELETE"])
@jwt_required()
def cancel_order(order_id):
    user_id = get_jwt_identity()
    order = Order.query.filter_by(id=order_id, user_id=user_id).first()

    if not order:
        return jsonify({"error": "Order not found"}), 404

    if order.status != "Pending":
        return jsonify({"error": "Only pending orders can be canceled"}), 400

    order.status = "Canceled"
    db.session.commit()

    return jsonify({"message": "Order canceled successfully"}), 200


# Track Order Status
@order_bp.route("/track/<int:order_id>", methods=["GET"])
@jwt_required()
def track_order_status(order_id):
    user_id = get_jwt_identity()
    order = Order.query.filter_by(id=order_id, user_id=user_id).first()

    if not order:
        return jsonify({"error": "Order not found"}), 404

    return jsonify({"order_id": order.id, "status": order.status}), 200


# Return Order
@order_bp.route("/return/<int:order_id>", methods=["POST"])
@jwt_required()
def return_order(order_id):
    user_id = get_jwt_identity()
    order = Order.query.filter_by(id=order_id, user_id=user_id).first()

    if not order:
        return jsonify({"error": "Order not found"}), 404

    if order.status != "Delivered":
        return jsonify({"error": "Only delivered orders can be returned"}), 400

    order.status = "Returned"
    db.session.commit()

    return jsonify({"message": "Order returned successfully"}), 200

# Get All Orders (Admin Only)
@order_bp.route("/", methods=["GET"])
@jwt_required()
def get_all_orders():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role == "admin":  # Admin can see all orders
        orders = Order.query.order_by(Order.created_at.desc()).all()
    else:
        orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()

    return jsonify([order.to_dict() for order in orders]), 200

# Update Order Status (Admin Only)
@order_bp.route("/update_status/<int:order_id>", methods=["PUT"])
@jwt_required()
def update_order_status(order_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role != "admin":
        return jsonify({"error": "Unauthorized"}), 403  # Only admins can update status

    order = Order.query.get(order_id)

    if not order:
        return jsonify({"error": "Order not found"}), 404

    data = request.get_json()
    new_status = data.get("status")

    valid_statuses = ["Pending", "Processing", "Shipped", "Delivered", "Canceled", "Returned"]

    if new_status not in valid_statuses:
        return jsonify({"error": "Invalid status"}), 400

    order.status = new_status
    db.session.commit()

    return jsonify({"message": f"Order status updated to {new_status}"}), 200


