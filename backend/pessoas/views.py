from django.shortcuts import redirect, render
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotFound
from .models import Pessoa
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json


def salvar(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        if nome:
            Pessoa.objects.create(nome=nome)
    return redirect('home')


def editar(request, id):
    pessoa = Pessoa.objects.get(id=id)
    return render(request, 'update.html', {'pessoa': pessoa})


def update(request, id):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        pessoa = Pessoa.objects.get(id=id)
        pessoa.nome = nome
        pessoa.save()
    return redirect('home')


def delete(request, id):
    pessoa = Pessoa.objects.get(id=id)
    pessoa.delete()
    return redirect('home')


# 🔥 API: desabilitar CSRF
@csrf_exempt
def pessoas_api(request):
    if request.method == 'GET':
        pessoas = list(Pessoa.objects.values('id', 'nome'))
        return JsonResponse(pessoas, safe=False)

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            nome = data.get('nome')
            if not nome:
                return HttpResponseBadRequest('nome required')
            pessoa = Pessoa.objects.create(nome=nome)
            return JsonResponse({'id': pessoa.id, 'nome': pessoa.nome})
        except json.JSONDecodeError:
            return HttpResponseBadRequest('invalid json')

    return HttpResponseBadRequest()


# 🔥 API: desabilitar CSRF
@csrf_exempt
def pessoa_api(request, id):
    try:
        pessoa = Pessoa.objects.get(id=id)
    except Pessoa.DoesNotExist:
        return HttpResponseNotFound()

    if request.method == 'GET':
        return JsonResponse({'id': pessoa.id, 'nome': pessoa.nome})

    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            nome = data.get('nome')
            if not nome:
                return HttpResponseBadRequest('nome required')
            pessoa.nome = nome
            pessoa.save()
            return JsonResponse({'status': 'ok'})
        except json.JSONDecodeError:
            return HttpResponseBadRequest('invalid json')

    if request.method == 'DELETE':
        pessoa.delete()
        return JsonResponse({'status': 'deleted'})

    return HttpResponseBadRequest()
