from rest_framework import generics

from tukiogram.api.serializers import TukioSerializer
from tukiogram.models import Tukio


class TukioListView(generics.ListAPIView):
	queryset = Tukio.objects.all()
	serializer_class = TukioSerializer

class TukioCreateAPIView(generics.CreateAPIView):
	queryset = Tukio.objects.all()
	serializer_class = TukioSerializer
	
	