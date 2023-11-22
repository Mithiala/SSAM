from apps.base.models import BaseModel
from apps.users.models import User
from django.db import models


class Notice(BaseModel):
    recibe = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Receptor",
        related_name="receiver",
    )
    envia = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Emisor",
        related_name="envia",
    )
    content = models.TextField("Contenido", blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "notifications"
        verbose_name = "Notificacion"
        verbose_name_plural = "Notificaciones"

    def __str__(self):
        return f"Mensaje {self.id} - {self.timestamp}"
