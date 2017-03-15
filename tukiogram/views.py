from django.shortcuts import render


# Create your views here.

def LoginView(request):
	return render(request, 'login.html')


def IndexView(request):
	return render(request, 'index.html')
