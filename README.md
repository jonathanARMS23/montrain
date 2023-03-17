# MONTRAIN API

## Description

Montrain est un API Restful de gestion de réservation de billet de train, developpé avec **NodeJS/NestJS** et **MongoDB**.

## Setup
### Installation

Pour installer le projet, veuillez cloner le repot github:

```
git clone https://github.com/jonathanARMS23/montrain.git
```

puis installez les dépendance en executant la commande:

```
npm install
```

### Configuration du transporter

Vous devez configurer le transporter pour que les envois d'email puissent fonctionné

=> Si vous êtes abonné à un service de mailing comme Sendgrid ou Mailtrap, utilisez vos information pour configurer le transporter, sinon comme dans mon cas durant le développement, utilisez " **Mailtrap Email Testing** ".

- Configurer le fichier `.env`

```
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_USER=5b154747c7249a
EMAIL_PASSWORD=cd1939eae2622e
EMAIL_PORT=2525
EMAIL_FROM=test@montrain.com
```

### Using Mailtrap

1. Inscrivez vous sur mailtrap.io
2. Accedez à **Email Testing** puis à votre **Inbox**
3. Dans la section **SMTP Settings** selectionnez **nodemailer** au niveau de l'integration
4. Copiez les paramètres de configuration du transporter
5. Modifier le fichier `.env` en utilisant ces paramètres

## Database MongoDB

La base de données mongoDB est hébergé sur mon cluster privé **MongoDB ATLAS**

```
mongodb+srv://clusterarms.lfnho.mongodb.net/montrain
```

## Commandes

- Lancer l'application
```
npm run start
```

- Lancer un test Jest et Supertest
```
npm run test
```