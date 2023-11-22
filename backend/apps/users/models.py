import os

from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from ..centro.models import Centro


def user_profile_directory_path(instance):
    profile_pic_name = "users/{0}/profile.jpg".format(instance.id)
    full_path = os.path.join(settings.MEDIA_ROOT, profile_pic_name)

    if os.path.exists(full_path):
        os.remove(full_path)

    return profile_pic_name


class UserManager(BaseUserManager):
    def _create_user(
        self,
        username,
        password,
        is_staff,
        is_superuser,
        **extra_fields,
    ):
        user = self.model(
            username=username,
            is_staff=is_staff,
            is_superuser=is_superuser,
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_user(self, username, password=None, **extra_fields):
        return self._create_user(username, password, False, False, **extra_fields)

    def create_superuser(self, username, password=None, **extra_fields):
        return self._create_user(username, password, True, True, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        ("username"),
        max_length=150,
        unique=True,
        validators=[username_validator],
        error_messages={
            "unique": ("A user with that username already exists."),
        },
    )
    avatar = models.ImageField(
        default="users/user_default_profile.png",
        upload_to=user_profile_directory_path,
        blank=True,
        null=True,
        verbose_name="Avatar",
    )
    nombre = models.CharField(
        "Nombre", max_length=50, unique=False, blank=True, null=True
    )

    centro_pertenece = models.ForeignKey(
        Centro,
        on_delete=models.SET_NULL,
        verbose_name="Centro",
        blank=True,
        null=True,
    )

    grupo = models.CharField(
        "Grupo", max_length=15, unique=False, blank=True, null=True
    )

    especialidad = models.CharField(
        "especialidad", max_length=15, unique=False, blank=True, null=True
    )
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = "username"

    class Meta:
        verbose_name = _("Usuario")
        verbose_name_plural = _("Usuarios")
