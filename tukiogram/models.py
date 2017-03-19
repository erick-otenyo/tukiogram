from __future__ import unicode_literals

from django.conf import settings
from django.contrib.gis.db import models


# Create your models here.

class Tukio(models.Model):
	CATEGORY_CHOICES = (
		('alert', 'Alert'),
		('event', 'Event')
	)
	user = models.ForeignKey(settings.AUTH_USER_MODEL)
	category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
	desc = models.CharField(max_length=70)
	timestamp = models.DateTimeField(auto_now_add=True)
	location_name = models.CharField(max_length=100, null=True)
	location_geom = models.PointField(srid=4326, unique=True)
	
	def __unicode__(self):
		return self.desc
	
	def get_absolute_ulr(self):
		return self.desc
