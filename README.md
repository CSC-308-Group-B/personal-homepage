# personal-homepage

## git convention

* "main" Branch - working code only; merge from "dev" when it's working
* "dev" Branch - only merge complete features into "dev" branch; we may push minor changes directly
* Feature Branches - developing features; merge into "dev" once complete

## Story Board
  https://www.figma.com/file/vtQom8y60GYXE9LsMwJg8K/Default-Page?node-id=0%3A1

## Last Test
 PASS  model/userServices.test.js
  ✓ Fetching all users (63 ms)
  ✓ Fetching user by id (20 ms)
  ✓ Fetching user by id (bad id) (69 ms)
  ✓ Fetch user by email (16 ms)
  ✓ Fetch user by email (bad email) (12 ms)
  ✓ add user (13 ms)
  ✓ add user (bad schema) (47 ms)
  ✓ Delete user by id (18 ms)
  ✓ Delete user by id (bad userId) (12 ms)
  ✓ Set user fields (14 ms)
  ✓ Set user fields (bad userId) (15 ms)
  ✓ Add tile to user by id (16 ms)
  ✓ Add tile to user by id (bad userId) (12 ms)
  ✓ Remove tile from user by ids (12 ms)
  ✓ Remove tile from user by ids (bad userId) (14 ms)
  ✓ Remove tile from user by ids (bad tileId) (14 ms)
  ✓ Update tile fields (14 ms)
  ✓ Update tile fields (bad userId) (12 ms)
  ✓ Update tile fields (bad tileId) (11 ms)
  ✓ Add tile list item (11 ms)
  ✓ Add tile list item (bad userId) (10 ms)
  ✓ Add tile list item (bad tileId) (10 ms)
  ✓ Delete tile list item (11 ms)
  ✓ Delete tile list item (bad userId) (10 ms)
  ✓ Delete tile list item (bad tileId) (10 ms)
  ✓ Delete tile list item (bad itemId) (11 ms)
  ✓ Update tile list item (13 ms)
  ✓ Update tile list item (bad userId) (9 ms)
  ✓ Update tile list item (bad tileId) (11 ms)
  ✓ Update tile list item (bad itemId) (12 ms)
  ✓ Get tile list item (11 ms)
  ✓ Get tile list item (bad input) (8 ms)

-------|---------|----------|---------|---------|-------------------
File   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------|---------|----------|---------|---------|-------------------
...les |   94.95 |    71.87 |     100 |   94.82 |                   
 ...js |     100 |      100 |     100 |     100 |                   
 ...js |   94.73 |    71.87 |     100 |   94.59 | 14-15,28-29,48-49 
-------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       32 passed, 32 total
Snapshots:   0 total
Time:        1.623 s, estimated 3 s
Ran all test suites.