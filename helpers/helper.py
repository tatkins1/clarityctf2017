# Use function testResult in this file to test your answer to the flag.
# Remember to run `pip install requests` to include the library.
# `secrets.txt` file must be in the root directory.
# Sample Usage (in another python file):
#   import helper
#   helper.testResult("12c", "abc")

import requests
import json

def testResult(flag, answer):
    team = open('../secrets.txt','r').read().split('::')[1].split( )[0]

    url = "https://acm-sinatra-vingkan.c9users.io/submission/" + str(flag)
    payload = {'team': team, 'answer': str(answer)}
    headers = {
        'content-type': "application/x-www-form-urlencoded",
        'cache-control': "no-cache"
        }

    response = requests.request("POST", url, data=payload, headers=headers)

    res = json.loads(response.text)
    if (res['correct']):
        print(flag + ": " + "Test Passed")
    else:
        print(flag + ": " + "Test Failed")
