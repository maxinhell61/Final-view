#Not sure the use for this code 
#  app/payment.py
import uuid
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from app import db
from app.models import Payments, Order, OrderStatusHistory

payment_bp = Blueprint("payment", __name__, url_prefix="/payments")


def _record_history(order, old_status, new_status):
    from app.models import OrderStatusHistory
    db.session.add(OrderStatusHistory(
        order_id=order.id,
        old_status=old_status,
        new_status=new_status,
        changed_at=datetime.utcnow()
    ))


@payment_bp.route("/initiate", methods=["POST"])
@jwt_required()
def initiate_payment():
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    order_id = data.get("order_id")
    method = data.get("payment_method")
    if not order_id or not method:
        return jsonify({"error": "order_id and payment_method required"}), 400

    order = Order.query.get(order_id)
    if not order or order.user_id != user_id:
        return jsonify({"error": "Order not found or unauthorized"}), 404

    txn_id = str(uuid.uuid4())
    pay = Payments(
        order_id=order_id,
        payment_method=method,
        transaction_id=txn_id,
        status="pending"
    )
    db.session.add(pay)
    db.session.commit()

    # pretend to return a client token
    return jsonify({
        "message": "Payment initiated",
        "transaction_id": txn_id,
        "status": pay.status
    }), 201


@payment_bp.route("/webhook", methods=["POST"])
def payment_webhook():
    data = request.get_json() or {}
    order_id = data.get("order_id")
    txn_id = data.get("transaction_id")
    status = data.get("status")
    if not all([order_id, txn_id, status]):
        return jsonify({"error": "order_id, transaction_id and status required"}), 400

    pay = Payments.query.filter_by(order_id=order_id, transaction_id=txn_id).first()
    if not pay:
        return jsonify({"error": "Payment record not found"}), 404

    pay.status = status
    pay.paid_at = datetime.utcnow()
    order = Order.query.get(order_id)

    old = order.status
    if status == "success":
        order.status = "Processing"
    else:
        order.status = "Payment_Failed"

    _record_history(order, old, order.status)
    db.session.commit()

    return jsonify({
        "message": f"Order {order_id} payment status updated to {status}"
    }), 200
