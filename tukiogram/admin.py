from django.contrib.gis import admin
from leaflet.admin import LeafletGeoAdmin

from tukiogram.models import Tukio

admin.site.site_header = 'Tukiogram'


# Register your models here.

class TukioAdmin(LeafletGeoAdmin):
	settings_overrides = {
		'DEFAULT_ZOOM': 16,
	}


admin.site.register(Tukio, TukioAdmin)
