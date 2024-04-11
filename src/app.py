"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import json
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, Subscribe, Compra, Alumno_Modulo, Curso, Modulo
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_mail import Mail, Message
from datetime import datetime
import stripe

stripe.api_key = "sk_test_51OtD4EFFwdFDHeIPh2VYkzCi9okYE4ndaNHSP3OSpP8SfLyAJwoQJ1RSXpW48z1kdqtP15Xf2nAxZuVHrbYr1krK00Djf2cSDh"
endpoint_secret = "whsec_XtrepXaxTXc5XsIsyctTHSqCt2ymbGbD"

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app)
jwt = JWTManager(app)
# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'teest4geeks12@gmail.com'  
app.config['MAIL_PASSWORD'] = 'ahyz rgmy igtb yclg'  

mail = Mail(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')




@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  
    return response

@app.route('/contact', methods=['POST'])
def contact():
    nombre = request.json.get("nombre", None)
    email = request.json.get("email", None)
    mensaje = request.json.get("mensaje", None)
    comoNosEncontraste = request.json.get("comoNosEncontraste", None)

    if not nombre or not email or not mensaje or not comoNosEncontraste:
        return jsonify({ "error": "Por favor, complete todos los campos del formulario de contacto" }), 400
    
    
    try:
        msg = Message('Nuevo mensaje de contacto', sender='teest4geeks12@gmail.com', recipients=['podcraftersacademy@gmail.com'])
        msg.body = f"Nombre: {nombre}\nCorreo electrónico: {email}\nMensaje: {mensaje}\nCómo nos encontraste: {comoNosEncontraste}"
        mail.send(msg)
        return jsonify({ "message": "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto." }), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 500
    
    

@app.route('/create-payment', methods=['POST'])
@jwt_required()
def create_payment():
    try:
        cursos = request.json.get('cursos', [])
        user = get_jwt_identity()
        line_items = []
        for c in cursos:
            line_items.append({
                'quantity': 1,
                'price_data': {
                    'currency': "eur",
                    'product_data': {
                        'name': c["name"]
                    },
                    'unit_amount': c["precio"] * 100
                }
            } )
        #print(line_items)
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items= line_items,
            mode='payment',
            success_url='https://sample-service-name-xxsu.onrender.com/conteoregresivo',  
            cancel_url='https://sample-service-name-xxsu.onrender.com/', 
            metadata = {
                "user_email": user,
                "cursos": json.dumps(cursos)
            }  
        )
        print(session)

        return jsonify({'sessionId': session['id']}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

        

@app.route('/send-email', methods=['POST'])
def send_email():
    email = request.json.get("email", None)

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({ "error": "Este usuario no existe"}), 401
   
    token = create_access_token(identity=email)
    link = 'https://sample-service-name-1krj.onrender.com/recover?token=' + token
   
    message = Message(
        subject="Reset your password",
        sender=app.config.get("MAIL_USERNAME"),
        recipients=[email],
        html='¡Hola!<br><br>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no solicitaste esto, por favor ignora este mensaje.<br><br>Para restablecer tu contraseña, haz clic en el siguiente enlace:<br><br><a href="' + link +'">Restablecer Contraseña</a><br><br>Gracias,<br>Equipo de PodCrafters Academy'
    )

    mail.send(message)

    return jsonify({ "msg": "success" }), 200

@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.json.get("email", None)

    if not email:
        return jsonify({ "error": "No email provided" }), 400

    try:
        subscriber = Subscribe.query.filter_by(email=email).first()
        if subscriber:
            return jsonify({ "error": "This email is already subscribed" }), 400

        new_subscriber = Subscribe(email=email)

        db.session.add(new_subscriber)
        db.session.commit()

        msg = Message('Gracias por suscribirte!', sender='teest4geeks12@gmail.com', recipients=[email])
        msg.body = 'Has suscrito a nuestro newsletter!'
        mail.send(msg)

        return jsonify({ "success": True, "message": "Subscription successful for email: {}".format(email)}), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 500

@app.route('/webhook', methods=['POST'])
def webhook():
    event = None
    payload = request.data
    sig_header = request.headers['STRIPE_SIGNATURE']

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        raise e
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise e

    # Handle the event
    if event['type'] == 'checkout.session.completed':
      checkout = event['data']['object']
      user_email = checkout['metadata']['user_email']
      cursos = json.loads(checkout['metadata']['cursos'])
      user = User.query.filter_by(email = user_email).first()
      if user is not None:
          for c in cursos:
              compra = Compra(
                  id_curso = c['id'],
                  id_usuario = user.id,
                  metodo_pago = "tarjeta_credito",
                  estado = "pagado",
                  fecha_pago = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")

              )
              db.session.add(compra)
              db.session.commit()
              
              modulos = Modulo.query.filter_by(id_curso = c['id'])
              modulos = list(map(lambda x: x.serialize(), modulos))
              print(modulos)
              if modulos is not None and len(modulos) > 0:
                  for m in modulos:
                      alumno_modulo = Alumno_Modulo(
                          id_modulo = m['id'],
                          id_alumno = user.id,
                          entregado = False,
                          revisado = False,
                          aprobado = False
                      )
                      db.session.add(alumno_modulo)
                      db.session.commit()
                  
    else:
      print('Unhandled event type {}'.format(event['type']))

    return jsonify(success=True)
