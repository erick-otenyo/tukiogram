from django.conf.urls import url, include
from rest_framework import routers

from tukiogram.api import views

app_name = 'tukiogram'

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'tukios', views.TukioViewSet, base_name='tukio_list')

urlpatterns = [
	url(r'^', include(router.urls)),
	url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
