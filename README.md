# Todo App

## Introduction
This Todo Web App has a couple of fronts:

### Backend
The backend was created using micoservices in NodeJS, there are two applications, one to handle `tasks` and the other for `users`.

### Frontend
The frontend was made using React

### Microservices
You can see the deployment configuration in `infra/k8s` folder

## Test the application
In order to make the application up and running locally, you must 

### Installing ingress:

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml
```
### Config `hosts` file

``` 127.0.0.1       users.com


