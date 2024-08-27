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

#### **Controllers**

##### Departments Controller
  DepartmentsController.js explanation:  
    - getting a specific department's information or all of the departments' information from MongoDB.  
    - posting a new department  
    - changing a department  
    - deleting a department  

##### Employees Controller
EmployeesController.js explanation:
    - getting all of the employees' information from MongoDB, or more customized information using the "Employees/Information" router
    - getting customized information about an employee, updating an employee, or deleting a specific employee through the "Employees/Information/:id" router
    - getting information about all of the shifts

##### Login Controller
LoginController.js explanation:  


### Front End with HTML







