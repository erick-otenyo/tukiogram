from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework_gis.serializers import GeoFeatureModelSerializer

from accounts.models import User
from tukiogram.models import Tukio


class UserSerializer(HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('url', 'first_name', 'last_name', 'email')


class TukioSerializer(GeoFeatureModelSerializer):
	class Meta:
		model = Tukio
		geo_field = 'location_geom'
		fields = ('user', 'desc', 'timestamp', 'category', 'location_name')
