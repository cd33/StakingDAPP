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
### Installation et execution:
```
$ git clone https://github.com/cd33/StakingDAPP.git
$ cd StakingDAPP
$ npm install
$ cd ./client
$ npm install
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

***
***
***

# StakingDAPP

Dapp that allows users to stake (immobilize) DAI and automate the issuance of rewards to stakers (liquidity providers) in the form of BIBS (Bibscoin) tokens.  
The reward in tokens received by the users (BIBS) is proportional to the amount of funds blocked on the smart contract and the current value of the DAI against the ETH, the Chainlink oracle allows to recover this value. 

### Project functional specifications: 
* Stake its token ERC20
* Unstake its tokens 
* Create your own reward token or use the ETH or another ERC20 token (Dai for example) 
* The amount of the reward must be proportional to the value locked on the smart contract 

### Requirements:
Use of Chainlink oracle 
***
### Installation and execution:
```
$ git clone https://github.com/cd33/StakingDAPP.git
$ cd StakingDAPP
$ npm install
$ cd ./client
$ npm install
$ npm start
```
### Environment settings
You will need to create an .env file in the project root folder. It will store specific deployment settings and your Infura project ID.  
* Create an .env file in your project folder  
* Replace the following settings with your own:
```
MNEMONIC = "Your_seed" (Your 12 word seed)
INFURA_PROJECT_ID = "Your_infura_project_id".
```
### For testing:
Install truffle and ``$ truffle test``
***
### Docs:
The ./docs folder contains the documentation for the contracts, generated using NatSpec and solidity-docgen.
***
### Deployment:
[Github-Pages](https://cd33.github.io/StakingDAPP/)  
[Heroku](https://staking-dapp.herokuapp.com/)
