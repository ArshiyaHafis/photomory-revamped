from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///images.db'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max

db = SQLAlchemy(app)

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    filename = db.Column(db.String(200), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/upload', methods=['POST'])
def upload_image():
    title = request.form.get('title')
    category = request.form.get('category')
    file = request.files.get('image')

    if not title or not category or not file:
        return jsonify({'error': 'Missing title, category or file'}), 400

    filename = secure_filename(file.filename)
    path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(path)

    image = Image(title=title, category=category, filename=filename)
    db.session.add(image)
    db.session.commit()

    return jsonify({'message': 'Image uploaded successfully'}), 200

@app.route('/images', methods=['GET'])
def get_images():
    images = Image.query.all()
    return jsonify([
        {
            'id': img.id,
            'title': img.title,
            'category': img.category,
            'url': f'/uploads/{img.filename}'
        } for img in images
    ])

@app.route('/uploads/<filename>')
def serve_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/delete/<int:image_id>', methods=['DELETE'])
def delete_image(image_id):
    image = Image.query.get(image_id)
    if not image:
        return jsonify({'error': 'Image not found'}), 404

    try:
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], image.filename))
    except FileNotFoundError:
        pass

    db.session.delete(image)
    db.session.commit()
    return jsonify({'message': 'Image deleted successfully'})

@app.route('/images/<category>', methods=['GET'])
def get_images_by_category(category):
    images = Image.query.filter_by(category=category).all()
    return jsonify([
        {
            'id': img.id,
            'title': img.title,
            'category': img.category,
            'url': f'/uploads/{img.filename}'
        } for img in images
    ])

@app.route('/categories', methods=['GET'])
def get_categories():
    categories = db.session.query(Image.category).distinct().all()
    return jsonify([c[0] for c in categories])


if __name__ == '__main__':
    app.run(debug=True)
