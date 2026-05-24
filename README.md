# Microservices Kubernetes Deployment

## Overview
This project demonstrates deployment of multiple Node.js microservices on Kubernetes using Minikube. The setup includes User, Product, Order, and Gateway services, with proper communication between them.

---

## Prerequisites

- Docker Desktop installed
- Minikube installed
- kubectl installed

Start Minikube before proceeding:

minikube start --driver=docker

---

## Building Docker Images

The images are built locally inside Minikube using the following commands:

minikube -p minikube docker-env | Invoke-Expression

docker build -t user-service ./Microservices/user-service  
docker build -t product-service ./Microservices/product-service  
docker build -t order-service ./Microservices/order-service  
docker build -t gateway-service ./Microservices/gateway-service  

---

## Deploying to Kubernetes

Apply all deployment and service configurations:

kubectl apply -f deployments/  
kubectl apply -f services/  
kubectl apply -f ingress/ingress.yaml  

---

## Verifying Deployment

Check if all pods are running:

kubectl get pods  

---

## Testing the Application

### Using Port Forward

kubectl port-forward svc/gateway-service 9090:80  

Open in browser:
http://localhost:9090/api/users  

---

### Using Ingress

Port forward ingress controller:

kubectl port-forward -n ingress-nginx service/ingress-nginx-controller 8081:80  

Update hosts file:

127.0.0.1 app.local.com  

Access the application:

http://app.local.com:8081/api/users  
http://app.local.com:8081/api/products  
http://app.local.com:8081/api/orders  

---

## Troubleshooting

- If images are not found, rebuild them inside Minikube
- If pods are stuck, check logs using:
  
  kubectl logs <pod-name>

- If ports are already in use, try using another port like 8082
- If ingress is not working properly, ensure tunnel or port-forward is active

---

## Result

The microservices are successfully deployed and can communicate with each other through the gateway. Ingress routing is also configured for external access.