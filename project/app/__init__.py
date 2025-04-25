from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate 
from app.config import Config 
from app.models import db


app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)
jwt = JWTManager(app)
migrate = Migrate(app, db) 


 
from app.auth import auth_bp  
from app.product import product_bp
 
from app.admin import admin_bp
from app.cart import cart_bp
from app.address import address_bp





# app.register_blueprint(address_bp)
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(product_bp)
app.register_blueprint(admin_bp, url_prefix='/admin')
app.register_blueprint(cart_bp)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

