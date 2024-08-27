# ProjectNode.JS_DavidHarrisonHaskell
 <u>A Node.JS project utilizing Express, MongoDB, and HTML to create  
  a website for managing employees, managers, departments, etc. of a factory</u>

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







