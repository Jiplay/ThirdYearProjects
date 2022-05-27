
# AREA

**Le projet AREA {EPITECH.} : un clone d'IFTTT, cela consiste à exécuter une réaction (à partir d’un service) quand une action est trouvée.**


Le projet est développé par 4 étudiants d'{EPITECH.} :
- ✨ Benoit Gasnier
- ✨ Ibrahim Zafar
- ✨ Julien Garsia
- ✨ Théau Benezet


Il est composé de **3 parties** :
- Back-end
- Application Web
- Application Mobile

**Stack :**
- Server back-end -> Go (Framework Go Gin)
- Application Front-End -> ReactJS
- Application Mobile -> React Native 

**Authentification :** 
_(Via firebase)_
- Créer un compte et être connecté
- Via Mail + MDP (création d’un compte)
- Via Google/Github etc (création automatique)

**Services :**
- ExchangeRatesAPI
- OpenWeatherMap
- League of Legends
- WAQI
- Coronavirus
- Nexmo SMS
- [Go’s SMTP (Simple Mail Transfer Protocol)]
- Google

**Actions configurables :**
- ExchangeRatesAPI : Une devise est supérieure à l'euro
- OpenWeatherMap : Météo d’une ville supérieure à une autre
- LoL : Quand les League Points sont supérieurs à 50
- Lol : Victoires du compte utilisateur dépassent l’objectif fixé
- LoL : Défaites du compte utilisateur dépassent l’objectif fixé
- LoL : Quand le tier du compte atteint le tier visé/fixé (ndlr : tier = rang)
- LoL : Quand le rang du compte atteint le rang visé/fixé
- LoL : Quand le compte utilisateur enchaîne des victoires (=Hotstreak)
- LoL : Quand le compte utilisateur atteint le rôle/statut de vétéran
- AQI : Qualité de l’air inférieur à la valeur demandé
- COVID-19 : hospitalisation liée au COVID-19 inférieur à la valeur entrée
- COVID-19 : hospitalisation journalière liée au COVID-19 inférieur à la valeur entrée
- COVID-19 : réanimation liée au COVID-19 inférieur à la valeur entrée
- COVID-19 : réanimation journalière liée au COVID-19 inférieur à la valeur entrée

Réactions :
- Nexmo SMS : Envoie de SMS
- Go’s SMTP : Envoie d’un mail
- Google : Ajout d’un évènement dans le google calendar

# API 

- /profile : afficher le profil
```
GET
Body : LOL, Trapzy, jujugarsia@gmail.com:currency, EUR_USD, jujugarsia@gmail.com:currency, EUR_USD, jujugarsia@gmail.com
Return Value : UID
```

- /newArea : nouvelle AREA
```
POST
Body : action, service, data, user
```

- /delAREA : supprimer une AREA 
```
POST
Body : action, service, data, user
```

- /update : mettre le profil à jour
```
POST
Body : user
```

- /register : Créer un compte 
```
POST
Body : user
```