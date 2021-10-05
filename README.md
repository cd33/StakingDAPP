# StakingDAPP

Dapp qui permet aux utilisateurs de stake (immobiliser) des DAI et d'automatiser l'émission de récompenses aux stakers (fournisseurs de liquidité) sous la forme de tokens BIBS (Bibscoin).  
La récompense en tokens reçues par les utilisateurs (BIBS) est proportionnelle à la quantité des fonds bloqués sur le smart contract et la valeur actuelle du DAI par rapport à l'ETH, l’oracle de Chainlink permet de récupérer cette valeur.  

### Les spécifications fonctionnelles du projet: 
* Stake son token ERC20
* Unstake ses tokens 
* Créer son propre token de récompense ou utiliser l’ETH ou un autre token ERC20 (Dai par exemple) 
* La quantité de la récompense doit être proportionnelle à la valeur bloquées sur le smart contract 

### Les exigences:
Utilisation de l’oracle Chainlink 
***
### Installation:
```
$ git clone https://github.com/cd33/StakingDAPP.git
$ npm install
$ cd ./client
$ npm start
```
### Paramètres d'environnement
Vous devrez créer un fichier .env dans le dossier racine du projet. Il stockera les paramètres de déploiement spécifiques et votre identifiant de projet Infura.  
* Créez un fichier .env dans le dossier de votre projet  
* Remplacez les paramètres suivants par les vôtres :
```
MNEMONIC = "Votre_seed" (Votre seed de 12 mots)
INFURA_PROJECT_ID = "Votre_infura_project_id".
```
### Pour les Tests:
Installez truffle et ```$ truffle test```
***
### Docs:
Le dossier ./docs contient la documention concernant les contrats, généré à l’aide des NatSpec et solidity-docgen.
***
### Deploiement:
[Github-Pages](https://cd33.github.io/StakingDAPP/)  
[Heroku](https://staking-dapp.herokuapp.com/)
