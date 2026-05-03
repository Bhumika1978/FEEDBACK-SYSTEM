# FEEDBACK-SYSTEM
1. Empty Fields Submission  
When the user submits the form without entering any data, the system should reject the request and show an error.

2. Invalid Email Format  
If the user enters an incorrect email format (e.g., abc@), the system should not accept it.

3. Extremely Long Feedback  
Very large input (more than 1000 characters) may affect performance or storage.

4. Duplicate Submission  
Submitting the same feedback multiple times leads to duplicate entries in the system.

5. Multiple Clicks on Submit Button  
Clicking the submit button repeatedly can send multiple requests and create duplicate data.

6. Backend Server Downtime  
If the backend server is not running, the frontend cannot submit data.

7. API Bypass (Direct Request)  
Users can bypass frontend validation using tools like Postman and send invalid data.

8. File Write Failure  
If there is an issue while writing to the JSON file, data may not be stored properly.

9. Special Characters / Script Injection  
Input like <script>alert('XSS')</script> can cause security issues if not handled properly.

10. High Concurrent Requests  
If multiple users submit feedback at the same time, data inconsistency may occur.

#Improvements
1. Improved Input Validation  
Problem: The system could accept invalid or malicious data.  
Solution: Added backend validation including required fields and email format checking using regex.  
Reason: Backend validation ensures security even if frontend is bypassed.

2. Prevention of Duplicate Submissions  
Problem: Users could submit the same feedback multiple times.  
Solution: Implemented duplicate checks in backend and disabled submit button after one click.  
Reason: Prevents spam and improves data quality.

3. Data Persistence and Error Handling  
Problem: Data could be lost if not stored properly.  
Solution: Used a JSON file for storage and added try-catch error handling.  
Reason: Ensures data reliability and avoids crashes during failures.

#System Approach
The system was designed using a simple frontend and backend architecture. 
The frontend collects user input and sends it to the backend via a REST API. 
The backend processes the request, validates the data, and stores it in a JSON file.

This approach was chosen because it is simple, easy to implement, and suitable for small-scale applications.
