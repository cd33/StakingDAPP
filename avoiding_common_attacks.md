## Avoiding Common Attacks

* 
* Inputs to ```createListing``` function are validated using ```require```. The listing Title is limited to 32 characters and listing Description to 256 characters.  Listing Price is required to be greater than zero to prevent underflow.  
