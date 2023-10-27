* Encoding: UTF-8.
dataset close all.
OUTPUT CLOSE ALL.

CD '/Users/emeijdam/Downloads/'.

* Observations.
* PeriodenCodes.csv.
* MeasureCodes.csv.
* PeriodenGroups.csv.
* MeasureGroups.csv.

PRESERVE.
 SET DECIMAL COMMA.

GET DATA  /TYPE=TXT
  /FILE="MeasureGroups.csv"
  /DELCASE=LINE
  /DELIMITERS=";"
  /QUALIFIER='"'
  /ARRANGEMENT=DELIMITED
  /FIRSTCASE=2
  /DATATYPEMIN PERCENTAGE=95.0
  /VARIABLES=
  Id AUTO
  Index AUTO
  Title AUTO
  Description AUTO
  ParentId AUTO
  /MAP.
RESTORE.

CACHE.
EXECUTE.
DATASET NAME MeasureGroups WINDOW=FRONT.

PRESERVE.
 SET DECIMAL COMMA.

GET DATA  /TYPE=TXT
  /FILE="/Users/emeijdam/Downloads/Observations.csv"
  /DELCASE=LINE
  /DELIMITERS=";"
  /QUALIFIER='"'
  /ARRANGEMENT=DELIMITED
  /FIRSTCASE=2
  /DATATYPEMIN PERCENTAGE=95.0
  /VARIABLES=
  Id AUTO
  Measure AUTO
  ValueAttribute AUTO
  Value AUTO
  StringValue AUTO
  Perioden AUTO
  /MAP.
RESTORE.

CACHE.
EXECUTE.
DATASET NAME Observations WINDOW=FRONT.


PRESERVE.
 SET DECIMAL COMMA.

GET DATA  /TYPE=TXT
  /FILE="/Users/emeijdam/Downloads/PeriodenCodes.csv"
  /DELCASE=LINE
  /DELIMITERS=";"
  /QUALIFIER='"'
  /ARRANGEMENT=DELIMITED
  /FIRSTCASE=2
  /DATATYPEMIN PERCENTAGE=95.0
  /VARIABLES=
  Id AUTO
  Measure AUTO
  ValueAttribute AUTO
  Value AUTO
  StringValue AUTO
  Perioden AUTO
  /MAP.
RESTORE.

CACHE.
EXECUTE.
DATASET NAME PeriodenCodes WINDOW=FRONT.

GET DATA  /TYPE=TXT
  /FILE="/Users/emeijdam/Downloads/MeasureCodes.csv"
  /DELCASE=LINE
  /DELIMITERS=";"
  /QUALIFIER='"'
  /ARRANGEMENT=DELIMITED
  /FIRSTCASE=2
  /DATATYPEMIN PERCENTAGE=95.0
  /VARIABLES=
  Id AUTO
  Measure AUTO
  ValueAttribute AUTO
  Value AUTO
  StringValue AUTO
  Perioden AUTO
  /MAP.
RESTORE.

CACHE.
EXECUTE.
DATASET NAME MeasureCodes WINDOW=FRONT.


