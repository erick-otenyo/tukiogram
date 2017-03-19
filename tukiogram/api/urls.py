from django.conf.urls import url, include

from tukiogram.api import views

app_name = 'tukiogram'

urlpatterns = [
	url(r'^tukios/$', views.TukioListView.as_view(), name='tukio-list'),
	url(r'^tukios/add/$', views.TukioCreateAPIView.as_view(), name='tukio-create'),
	url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
