from django.shortcuts import render

from .forms import TukioForm


# Create your views here.

def LoginView(request):
	return render(request, 'login.html')


def IndexView(request):
	if request.user.is_authenticated():
		form = TukioForm
	else:
		form = None
	context = {
		'tukio_form': form
	}
	return render(request, 'index.html', context)
