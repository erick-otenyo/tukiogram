from django.forms import ModelForm

from .models import Tukio


class TukioForm(ModelForm):
	class Meta:
		model = Tukio
		fields = ['category', 'desc', 'location_name']
