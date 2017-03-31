# Challenge 18: Bug Hunting

You have been working with the Clarity team to develop [the Metra website](https://metrarail.com/), which has been live for almost a year. You also have access to [the staging website](https://stage.metratest.com/). The website has undergone several changes since it's gone live, and there really hasn't been a comprehensive test of the entire site since the recent upgrades; you are tasked with conducting that testing and reporting any bugs found back to the development team.

Note: access to the staging site will only be available when on the Clarity network, so only on-site during the competition.

Report basic scenarios that caused any errors you encounterm including items such as:
* Description of error
* Browser
* Browser version
* Device
* Specific environment (stage or production, URL)
* Screenshot(s)
* User state (anonymous, authenticated, if authenticated: then role)
* Whether replicated or only a one-time error

## Flags

- [] 18a: Create any relevant files in this directory and submit the link using the contest form.

## Judging Rubric

Points | Criteria
------ | --------
1 | For each reported element from the list above for each bug found.
10 | Create a centralized/systemic method for reporting bugs.
20 | Creating and documenting set of use cases to test against.
30 | Create automated unit tests (i.e., using a tool like Selenium) (BONUS)