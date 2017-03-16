from __future__ import unicode_literals

from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models


class Confirm(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL)
	content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
	object_id = models.PositiveIntegerField()
	content_object = GenericForeignKey('content_type', 'object_id')
	confirm = models.BooleanField(default=False)
	timestamp = models.DateTimeField(auto_now_add=True)
	
	def __unicode__(self):
		return str(self.user.first_name)


class Deny(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL)
	content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
	object_id = models.PositiveIntegerField()
	content_object = GenericForeignKey('content_type', 'object_id')
	deny = models.BooleanField(default=False)
	timestamp = models.DateTimeField(auto_now_add=True)
	
	def __unicode__(self):
		return str(self.user.first_name)
