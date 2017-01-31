This reactjs app has 2 text fields (pick-up address, drop off address) and a button "submit". 
It needs to get coordinates and address components from input fields (using GoogleMapsDIstanceMatrixAPI),
after that, it checks distance (less than 20 miles) and pushes it to firebase as a unique record 
if it's within range area.