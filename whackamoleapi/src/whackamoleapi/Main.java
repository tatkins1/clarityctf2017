package whackamoleapi;

// Importing relevant packages - DO NOT CHANGE THIS
import java.io.*;
import java.util.*;

import org.apache.commons.io.IOUtils;
import org.apache.http.nio.reactor.IOReactorException;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.*;

import whackamoleapi.ServiceRequest; 

// YOU MUST DO THE CHALLENGES IN ORDER

public class Main {
	
	// This is the global data store - DO NOT CHANGE THIS
	static ServiceRequest[] reqs = new ServiceRequest[500];

	public static void main(String[] args) throws IOReactorException {
		
		// You can selectively comment and uncomment function calls to run them!
		getDataBasic();
		zipCode();
		getDataAdv();
		date();

	}

	
	// This flag asks you to fetch data from an API, you need to correctly fetch and parse data from
	// the API. To get points for this challenge you need to set the answer variable equal to the 
	// service request number of the first service request you got back from the API.
	
	// You only need to get the creation date, status, service request number and zipcode.
	private static void getDataBasic() throws IOReactorException {
		String answer = ""; // Store your answer in this variable!
		
		HttpResponse<JsonNode> response = null;
		try {
			// This is the actual call to the API
			response = Unirest.get("https://data.cityofchicago.org/resource/dvua-vftq.json")
					  .header("content-type", "application/x-www-form-urlencoded")
					  .header("cache-control", "no-cache")
					  .asJson();
		} catch (UnirestException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		// Save ROW #500 to #1000 in array of ServiceRequest - DO NOT CHANGE the Loop Start and End Values
		for (int i=500; i<1000; i++) {
			// Parse data from API over here
			// Hint: print response.getBody() to get a feel for the data
			
			// JSONObject resObj =
			
			// You need to define the ServiceRequest object
			// reqs[i-500] = new ServiceRequest();
		}
		
		testResult("11a", answer); // This line runs the online test! - DO NOT CHANGE
			
	}
	
	// This flag asks you to find the ZipCode with the most complaints
	// Most of this is already done for you
	private static void zipCode() {
		String answer = ""; // Store your answer in this variable!
		Integer startValue = 0;
		Hashtable<String, Integer> zipCodes = new Hashtable<String, Integer>();
		
		for (int i=0; i<500; i++){
			// Integer count = zipCodes.get();
			if (count == null) {
				// zipCodes.put(, 0);
			} else {
				// zipCodes.put(, count + 1);
			}
		}
		
		// Forward look up
		for (int i=0; i<500; i++){
			// Integer count = zipCodes.get();
			if (count > startValue) {
				startValue = count;
			}
		}
		
		// Reverse look up
		for (int i=0; i<500; i++) {
			// Integer count = zipCodes.get();
			if (count == startValue) {
				//answer = 
			}
		}
		
		testResult("11b", answer); // This line runs the online test! - DO NOT CHANGE
		
	}
	
	// The customer specification has now changed and you now need the completion date as well
	// modify your solution to the first challenge to implement that. You need to set answer to be 
	// the {service request no},{completion date}
	private static void getDataAdv() throws IOReactorException {
		String answer = ""; // Store your answer in this variable!
		
		HttpResponse<JsonNode> response = null;
		try {
			response = Unirest.get("https://data.cityofchicago.org/resource/dvua-vftq.json")
					  .header("content-type", "application/x-www-form-urlencoded")
					  .header("cache-control", "no-cache")
					  .asJson();
		} catch (UnirestException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		// Save ROW #500 to #1000 in array of ServiceRequest - DO NOT CHANGE the Loop Start and End Values
				for (int i=500; i<1000; i++) {
					// Parse data from API over here
					// Hint: print response.getBody() to get a feel for the data
					
					// JSONObject resObj =
					
					// reqs[i-500] = new ServiceRequest();
				}
		
		testResult("11c", answer); // This line runs the online test! - DO NOT CHANGE
		
	}
	
	// This is very similar to the 2nd challenge, but now you need the day with the least amount of complaints
	// You need to set answer to {day},{the count}
	private static void date() {
		String answer = ""; // Store your answer in this variable!
		Integer startValue = 1000000;
		Hashtable<String, Integer> dates = new Hashtable<String, Integer>();
		
		for (int i=0; i<500; i++){
			// Integer count = dates.get();
			if (dat == null) {
				// dates.put(, 0);
			} else {
				// dates.put(, count + 1);
			}
		}
		
		// Forward look up
		for (int i=0; i<500; i++){
			// Integer count = dates.get();
			if (count < startValue) {
				startValue = count;
			}
		}
		
		// Reverse look up
		for (int i=0; i<500; i++) {
			// Integer count = dates.get();
			if (count == startValue) {
				//answer = 
			}
		}
		
		testResult("11d", answer); // This line runs the online test! - DO NOT CHANGE
		
	}
	
	
	
	// DO NOT CHANGE - This function is used to test your answers to the challenges
	private static void testResult(String ques, String ans) {
		System.out.println("Testing for - " + ques + ": " + ans);

		// Reading in file
		java.io.FileInputStream inputStream = null;
		try {
			inputStream = new java.io.FileInputStream("secrets.txt");
		} catch (java.io.FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		try {
			@SuppressWarnings("deprecation")
			String inStr = IOUtils.toString(inputStream);
			
			String team = inStr.split("\n")[0].split("::")[1].trim();
			HttpResponse<JsonNode> response = Unirest.post("https://acm-sinatra-vingkan.c9users.io/submission/" + ques)
					  .header("content-type", "application/x-www-form-urlencoded")
					  .header("cache-control", "no-cache")
					  .field("team", team)
					  .field("answer", ans)
					  .asJson();
			
			if (response.getBody().getObject().get("correct").toString().equalsIgnoreCase("true")) {
				System.out.println(ques + ": Test Passed");
			} else {
				System.out.println(ques + ": Test Failed");
			}
			
		} catch (IOException | UnirestException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
		
}
