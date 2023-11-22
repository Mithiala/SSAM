from rest_framework.routers import DefaultRouter

from .viewsets import NoticeViewSet

router = DefaultRouter()


# router.register(r"info", MessageViewSet, basename="info")
router.register(r"notice", NoticeViewSet, basename="notifications")

urlpatterns = router.urls
