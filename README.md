Questions :
In a README in your repo, answer the following (DO NOT IMPLEMENT)
How would your tables and apis change for the following scenarios. What tables and api endpoints would you add Which tables and api endpoints would need to be updated?

1. If a user can create and edit stages for a particular board. For example instead of Open > In Progress > Done if they want the stages of their task board to be Read > Working > Reviewing > Completed
If we are working on NoSql database so we have to update Stages collection with specific stage id with proper update data 
ex we want to update open stages to read stages so we can take that stage id and find that document  then update that document 
simply find using id --> then update using id --> give sucess or error response

2. If users can comment on tasks
For adding features of commenting we can create a new collection and stored comments in this by taking stages and card id as refrence 
we also have one more method by simplying adding comments in cards document as array but this can increase developer burden and reduces flexibility and increase complexity in database

3. How will you do error handling?
As i am using Node js Javascript for developing a web app in which javascript provide its own error handling , we can also use try and catch to run async opertaion 

there are many methods but I can not discuss all in this single readme 


WHY I AM LATE FOR Submiting project
1. We have to imporatant industrial training from 21 sep to 19 October so I was not getting enough time for developing projects
2. I can make this project more advance and optimaized 
3. I used Next js in frontend and Node js Express Js and Mongo Db in Backend 
4. I want to deploy this project and then send the link but My favorite render do not support latest Node js so I dont have any free alternative 

Installtaion Steps

Frontend link - https://github.com/Abdev1205/Zuddl-frontend
1. Install node modules by running npm install command inside downloaded folder
2. Run npm run dev to start next js application 

Backend link - https://github.com/Abdev1205/Zuddl-Backend
1. Install node modules by running npm install command inside downloaded folder
2. Create .env file and this MONGO_URL = mongodb+srv://abhay:abhay@cluster0.0rakbqu.mongodb.net/zuddlBackend?retryWrites=true&w=majority
3. Run npm run dev to start node js server
