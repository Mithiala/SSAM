from apps.clasificador.views import TrainModelView
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("djoser.urls")),
    path("api/", include("djoser.urls.jwt")),
    path("centros/", include("apps.centro.routers")),
    path("tsocial/", include("apps.tsocial.routers")),
    path("psicologia/", include("apps.psicologia.routers")),
    path("asistmedica/", include("apps.asistmedica.routers")),
    path("farmacia/", include("apps.farmacia.routers")),
    path("mensajes/", include("apps.mensajes.routers")),
    path("train/", TrainModelView.as_view(), name="Clasificación"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path("doc/yaml/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "doc/swagger/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger",
    ),
    path(
        "doc/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]
