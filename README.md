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
### Pour les Tests:
Installer truffle et ```$ truffle test```