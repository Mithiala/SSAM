from rest_framework import serializers

from .models import Notice


class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        exclude = ("created_date", "modified_date", "deleted_date", "state")

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "id_user": instance.recibe.id if instance.recibe is not None else "",
            "recibe": instance.recibe.username if instance.recibe is not None else "",
            "id_user": instance.envia.id if instance.envia is not None else "",
            "envia": instance.envia.username if instance.envia is not None else "",
            "content": instance.content,
            "timestamp": instance.timestamp,
        }
