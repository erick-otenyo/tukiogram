from rest_framework import viewsets

from tukiogram.api.serializers import TukioSerializer
from tukiogram.models import Tukio


class TukioViewSet(viewsets.ModelViewSet):
	queryset = Tukio.objects.all()
	serializer_class = TukioSerializer
