# Challenge 10: No Service
Clarity wants to protect its servers from _Denial of Service_ attacks.

Your task will be to implement a program that uses the provided server logs to signal the team when a _DOS_ attack is detected based on the following semantic:
- If two requests from the same IP are within 1 second of each other the IP will be recorded.
- If the number of times the IP is recorded is greater than 80 then attack on server.

## Flags
- 10a: Identify _DOS_ attack using the `Log 5` file.
Your answer should be a string of the form `{Malicious IP},{No. of Requests}` eg. `10.20.30.40,115`

## Judging
Judging for this challenge will be done automatically. [Helper files](https://github.com/acmillinoistech/clarityctf2017/tree/master/helpers) have been made for popular languages to help you test your solution.
