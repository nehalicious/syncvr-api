# SyncVR Fibonacci Functions

This project consists of a REST api to connect the SyncVR Fibonacci frontend and the Firestore database. The code has been written using Express (Typescript)

The Firestore database has been designed keeping the following structure in mind:


    fibonacci : {
        key : {
            index : 'n'
            value 'x',
            access_time: 't'
        }
    }
    
The logic here is that when a user requests a fibonacci number 'n', we first search the existing 
values in the database to check if an index matches n. If yes, it means we've already calculated and stored this number, 
so we can update the access time and return the value.

If n doesn't match any index, we find the last 2 fibonacci numbers we calculated, and calculate and store all numbers > these number and <=n,
so that if someone queries for a number less than 'n', it can be efficiently found.

## Problems encountered
This was my first time using Firebase, Express and Typescript, so it took a while to fix some bugs I was running into.
One of the issues that I was not able to fix in the allotted time was issues grasping values for request bodies.
Not sure what's going wrong there, but I ran out of time before I could figure it out.