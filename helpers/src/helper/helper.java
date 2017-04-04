// Use function testResult in this file to test your answer to the flag.
// Remember you might have to change the package!
// `secrets.txt` file must be in the root directory.
// Sample Usage (in another java file):
//  import helper.helper // The first helper is the package name!
//  helper.testResult("12c", "abc")

package helper;

import java.io.IOException;
import org.apache.commons.io.IOUtils;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

public class helper {
	// DO NOT CHANGE - This function is used to test your answers to the challenges
	 public static void testResult(String flag, String answer) {

		// Reading in file
		java.io.FileInputStream inputStream = null;
		try {
			inputStream = new java.io.FileInputStream("../../secrets.txt");
		} catch (java.io.FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		try {
			@SuppressWarnings("deprecation")
			String inStr = IOUtils.toString(inputStream);
			
			String team = inStr.split("\n")[0].split("::")[1].trim();
			HttpResponse<JsonNode> response = Unirest.post("https://acm-sinatra-vingkan.c9users.io/submission/" + flag)
					  .header("content-type", "application/x-www-form-urlencoded")
					  .header("cache-control", "no-cache")
					  .field("team", team)
					  .field("answer", answer)
					  .asJson();
			
			if (response.getBody().getObject().get("correct").toString().equalsIgnoreCase("true")) {
				System.out.println(flag + ": Test Passed");
			} else {
				System.out.println(flag + ": Test Failed");
			}
			
		} catch (IOException | UnirestException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
}
