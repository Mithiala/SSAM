# Crear entorno viertual de python
python -m virtualenv env

# Activar entorno viertual de python
.\env\Scripts\activate

# Intalar requerimientos de python - django rest framework
pip install django djangorestframework django-filter django-cors-headers psycopg2 django-environ drf-spectacular drf-spectacular-sidecar django-import-export Pillow django-dbbackup dj-rest-auth djangorestframework-simplejwt

# Crear Proyecto
django-admin startproject core .

# Crear Aplicacion
django-admin startapp auth

# Crear SuperUsuario
python manage.py createsuperuser
# Recrear archivos estaticos de drf
python manage.py collectstatic
# Correr Servidor de desarrollo
python manage.py runserver
# Crear las Migraciones de BD
python manage.py makemigrations
# Aplicar la Migraciones en la BD
python manage.py migrate
# Poblar BaseDatos
python manage.py loaddata name.json

```