package catchmeifyoucan;

//Importing relevant packages - DO NOT CHANGE THIS
import catchmeifyoucan.helper;
import java.util.Hashtable;
import org.json.JSONObject;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

//YOU MUST DO THE CHALLENGES IN ORDER

public class Main {

	// Universal Data Stores - You need to define these Objects
	static Crime[] crimes = new Crime[1000];
	static Ward[] wards = new Ward[50];
	
	public static void main(String[] args) {
		
		// You can selectively comment and uncomment function calls to run them!
		getCrimeData();
		getWardData();
		threatLevel();
		rateOfCrime();
		emailWard();
	}
	
	// This flag asks you to fetch data from an API, you need to correctly fetch and parse data from
	// the API. To get points for this challenge you need to set the answer variable equal to the 
	// case number of the first crime gotten back from the API.
	
	public static void getCrimeData() {
		String answer = ""; // Store your answer in this variable!
		
		HttpResponse<JsonNode> response = null;
		try {
			// This is the actual call to the API
			response = Unirest.get("https://data.cityofchicago.org/resource/6zsd-86xi.json")
					  .header("content-type", "application/x-www-form-urlencoded")
					  .header("cache-control", "no-cache")
					  .asJson();
		} catch (UnirestException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		// Only process the first 1000 responses!
		
		helper.testResult("12a", answer);
	}
	
	// This flag asks you to fetch data from an API, you need to correctly fetch and parse data from
	// the API. To get points for this challenge you need to set the answer variable equal to the 
	// alderman of Ward No 11
	 public static void getWardData() {
		 String answer = ""; // Store your answer in this variable!
		 
		 HttpResponse<JsonNode> response = null;
			try {
				// This is the actual call to the API
				response = Unirest.get("https://data.cityofchicago.org/resource/7ia9-ayc2.json")
						  .header("content-type", "application/x-www-form-urlencoded")
						  .header("cache-control", "no-cache")
						  .asJson();
			} catch (UnirestException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			// Keep in mind the number of Wards
			
			helper.testResult("12b", answer);
	 }
	 
	 // You need to calculate the threat level per ward. If the crime type is battery raise the level by 10
	 // If it is Robbery raise the level by 5 for everything else raise the level by 3
	 // To gey points for this flag you need to set the answer varibale equal to the threat level of Ward 25
	 public static void threatLevel() {
		 String answer = ""; // Store your answer in this variable!
		 
		 
		 helper.testResult("12c", ll.get("25").toString());
		 
	 }

	 // You need to calculate the number of crimes that have occured per street.
	 // To get points for this flag you need to set the answer variable equal to the crimes of `W FULLERTON AVE`
	 // HINT: Keep in mind Per Street
	 public static void rateOfCrime() {
		 String answer = ""; // Store your answer in this variable!
		 
		 helper.testResult("12d", answer);
		 
	 }
	 
	 // The city wants Monthly Updates about the threat level. Use data from the Wards API to form
	 // an email string like this `Emailing: {alderman} at: {email} threat level: {threat level}` 
	 // eg. Emailing: Howard B. Brookins, Jr. at: ward21@cityofchicago.org threat level: 44
	 // To get points for this flag set the answer variable to the string formed for Ward 26
	 public static void emailWard() {
		String answer = ""; // Store your answer in this variable!
		 
		helper.testResult("12e", answer);
	 }

}
