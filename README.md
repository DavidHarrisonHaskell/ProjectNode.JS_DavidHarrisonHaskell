# ProjectNode.JS_DavidHarrisonHaskell
 <u>A Node.JS project utilizing Express, MongoDB, and HTML to create  
  a website for managing employees, managers, departments, etc. of a factory</u>

## Demo
[![Image ALT TEXT HERE](https://img.youtube.com/vi/fNNoSSuHsgE/0.jpg)](https://youtube.com/watch?v=fNNoSSuHsgE)

## Introduction
- The goal of the website is to create a a website that manages a factory. 
- The factory is comprised of employees. Each employee belongs to a department and can work several shifts. 
- Every Shift can be assigned to more than one employee.
- Only users who are registered can log in to the website.  

## Outline of the Website

### Back End with Node.JS, Express, and MongoDB
**Main Points**  
- The MongoDB database has collections for the users,
departments, employees, and shifts.  
- Every user has a number of actions which he or she can make every day on the website.  
- This includes logging in, generating tables of information, and making various updates.  
- Once a user finished his maximum number of actions for the day, he is alerted with a message and then logged out for the day.
- Every action is logged to the SystemUsersActions.json file.  
- To log in, the user must enter his username and email. The website checks jsonplaceholder.typicode.com/users to see that such a username and email exists and then provides a token to the user. The user is then able to log in and perform up to the maximum number of actions for that day.  

#### index.js
- This file is where express is set up and which provides routers to the Departments, Employees, Login, Shifts, or Users Controllers.  

#### SystemUsersActions.json
- A log of the actions which included the user's id, maximum number of actions allowed, date, and the remaining number of actions allowed for that day.

#### **Configs**
This folder contains the configsMongoDB.js file which connects the server to MongoDB.

#### **Controllers, Services, Repositories, Models**
The general flow of the project has the controllers referring to the services which then refer to the repositories which access the MongoDB models of the relevant collection. For the sake of simplicity, see the following descriptions of the controllers to understand the server's structure. Then, check the files of the relevant services, repositories, and models for further details.  

##### <u>Departments Controller</u>
  DepartmentsController.js explanation:
  - getting a specific department's information or all of the departments' information from MongoDB.  
  - posting a new department  
  - changing a department  
  - deleting a department  

##### <u>Employees</u>
EmployeesController.js explanation:
- getting all of the employees' information from MongoDB, or more customized information using the "Employees/Information" router
- getting customized information about an employee, updating an employee, or deleting a specific employee through the "Employees/Information/:id" router
- getting information about all of the shifts  

##### <u>Login Controller</u>
LoginController.js explanation:  
- checks the REST API of the jsonplaceholder website mentioned before and, if the username and password are correct, gets a token which the user will use to access the website  

##### <u>Shifts Controller</u>  
ShiftsController.js explanation:  
- get all of the shifts
- post a new shift
- update an existing shift

##### <u>Users Controller</u>  
UsersController.js explanation:  
- getting all of the users' information
- posting an action of the user


### Front End with HTML
Every page after logging in displays the real name of the user, pulled from MongoDB. Certain features of each HTML page:  

- DepartmentPage.html
    - A button for generating a table of departments
    - Button for adding a new department (redirect to NewDepartmentPage.html)  

- EditDeparmtentPage.html
    - Update a department's manager
    - Delete a department
    - Assign an employee to a department  

- EditEmployeePage.html
    - Update an employee's information
    - Register an employee to an existing shift
    - A list of an employee's current shifts
    - Delete the employee's data  

- EmployeesPage.html
    - Generate a table which has each employee's full name, department, and shifts
    - Filter the table by department
    - Button for adding an employee (redirect to NewEmployeePage.html)  

- LoginPage.html  
    - Entering username and email of a user to log into the website  

- NewDepartmentPage.html
    - Creating a new department and selecting that department's manager from amongst the employees who are not currently managers.  

- NewEmployeePage.html
    - Add a new Employee which includes entering that employee's first name, last name, start work year, and selecting a department.  

- ShiftsPage.html
    - Create a new shift
    - Change an existing shift
    - Allocate an employee to a selected shift  

- UsersPage.html
    - A button for generating a table of users which displays each user's name, maximum number of actions allowed, and the current number of actions allowed for the current day stored in the website's MongoDB database.



    






