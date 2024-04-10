from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import LargeBinary

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    userName = db.Column(db.String(80), unique=True, nullable=False)
    firstName = db.Column(db.String(80), nullable=False)
    lastName = db.Column(db.String(80), nullable=False)
    birthDay = db.Column(db.String(80), nullable=True)
    gender = db.Column(db.Enum("masculino", "femenino", "no_binario", name="gender_enum"), nullable=True)
    profile_image = db.Column(db.LargeBinary)
    profesor = db.Column(db.Boolean, nullable=True)
    fecha_registro = db.Column(db.String(80), nullable=True)
    telephone = db.Column(db.String(20), nullable=True)
    country = db.Column(db.String(40), nullable=True)
    address = db.Column(db.String(80), nullable=True)
    idioma_español = db.Column(db.Boolean, nullable=True)
    ultima_conexion = db.Column(db.String(40), nullable=True)
    mentor = db.Column(db.Boolean, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "userName": self.userName,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "telephone": self.telephone
        }


class Curso(db.Model):
    __tablename__ = "curso"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    precio = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Curso {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "precio": self.precio
        }
    
class Compra(db.Model):
    __tablename__ = "compra"
    id = db.Column(db.Integer, primary_key=True)
    id_curso = db.Column(db.Integer, db.ForeignKey("curso.id"), nullable=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    metodo_pago = db.Column(db.Enum("tarjeta_credito", "transferencia", "financiacion", name="pago_enum"), nullable=False)
    fecha_pago = db.Column(db.String(40), nullable=False)
    estado = db.Column(db.String(20), nullable=False)
    descuento = db.Column(db.Boolean, nullable=True)
    cupon = db.Column(db.String(20), nullable=True)
    stripe_transaction_id = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f'<Compra {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_curso": self.id_curso,
            "id_usuario": self.id_usuariopipe
        }

class Desestimiento(db.Model):
    __tablename__ = "desestimiento"
    id= db.Column(db.Integer, primary_key=True)
    id_compra = db.Column(db.Integer, db.ForeignKey("compra.id"), nullable=False)
    motivo = db.Column(db.String(50), nullable=True)
    fecha = db.Column(db.String(40), nullable=False)
    dentro_plazo = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f'<Desestimiento {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_compra": self.id_compra,
            "fecha": self.fecha
        }
    
class Contenido_Curso(db.Model):
    __tablename__ = "contenido_curso"
    id = db.Column(db.Integer, primary_key=True)
    id_curso = db.Column(db.Integer, db.ForeignKey("curso.id"), nullable=False)
    descripcion = db.Column(db.String(50), nullable=False)
    duracion = db.Column(db.Integer, nullable=False)
    fecha_inicio = db.Column(db.String(30), nullable=False)
    id_profesor = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    
    def __repr__(self):
        return f'<Contenido_Curso {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_curso": self.id_curso,
            "descripcion": self.descripcion
        }
    
class Modulo(db.Model):
    __tablename__ = "modulo"
    id = db.Column(db.Integer, primary_key=True)
    nombre_modulo = db.Column(db.String(100), nullable=False)
    id_curso = db.Column(db.Integer, db.ForeignKey("curso.id"), nullable=False)
    contenido_modulo = db.Column(db.String(1500), nullable=False)
    def __repr__(self):
        return f'<Modulo {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre_modulo": self.nombre_modulo,
            "id_curso": self.id_curso,
            "contenido_modulo": self.contenido_modulo
        }
    
class Alumno_Modulo(db.Model):
    __tablename__ = "alumno_modulo"
    id = db.Column(db.Integer, primary_key=True)
    id_modulo = db.Column(db.Integer, db.ForeignKey("modulo.id"), nullable=False)
    id_alumno = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    entregado = db.Column(db.Boolean, nullable=False)
    revisado = db.Column(db.Boolean, nullable=False)
    aprobado = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f'<Alumno_Modulo {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_modulo": self.id_modulo,
            "id_alumno": self.id_alumno
        }

class Mentorias(db.Model):
    __tablename__ = "mentorias"
    id = db.Column(db.Integer, primary_key=True)
    id_mentor = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    id_alumno = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    asistido = db.Column(db.Boolean, nullable=False)
    fecha = db.Column(db.String(30),nullable=False)
    hora = db.Column(db.String(10), nullable=False)
    encuesta = db.Column(db.Boolean, nullable=False)
    duracion = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f'<Mentorias {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_mentor": self.id_mentor,
            "id_alumno": self.id_alumno
        }


class Disponibilidad_Mentor(db.Model):
    __tablename__ = "disponibilidad_mentor"
    id = db.Column(db.Integer, primary_key=True)
    link_calendario = db.Column(db.String(40), nullable=False)
    id_mentor = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __repr__(self):
        return f'<Disponibilidad_Mentor {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_mentor": self.id_mentor,
            "link_calendario": self.link_calendario
        }


class Mas_Informacion(db.Model):
    __tablename__ = "mas_informacion"
    id = db.Column(db.Integer, primary_key=True)
    id_curso = db.Column(db.Integer, nullable=False)
    first_Name = db.Column(db.String(40), nullable=False)
    last_Name= db.Column(db.String(40), nullable=False)
    email= db.Column(db.String(40), nullable=False)

    def __repr__(self):
        return f'<Mas_Informacion {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_curso": self.id_curso,
            "email": self.email
        }
        

class Subscribe(db.Model):
    __tablename__ = "subscribe"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return f'<Subscribe {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email
        }
