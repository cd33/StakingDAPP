## Avoiding Common Attacks

### Re-Entrancy
To avoid re-entrancy, I use the Checks-Effects-Interactions pattern for my functions:
* Use of require
* State changes
* Interactions with contracts

### Underflow / Overflow
Uints used in functions must be greater than or equal to zero and less than a certain value to avoid Underflow / Overflow.

### Internal
Declaration of some functions as internal to avoid unnecessary external interactions.