#!/bin/bash
echo Starting MongoDB import:
mongoimport --db maptest --collection zips --file --type json --file zipcode_poly_docs.json --jsonArray
echo Import Complete
