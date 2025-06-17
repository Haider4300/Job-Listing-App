from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db  # Use shared db instance
from routes import init_routes  # Route initializer

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jobs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)

# Register routes
init_routes(app)

# Create tables if not present
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)

