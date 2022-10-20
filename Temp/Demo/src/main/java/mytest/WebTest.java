package mytest;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class WebTest {
    public static void main(String[] args) throws InterruptedException {
        String baseUrl = "https://www.facebook.com";
        System.setProperty("webdriver.chrome.driver","C:\\Users\\Jay Surana\\Downloads\\chromedriver.exe");
        WebDriver obj = new ChromeDriver();
        obj.get(baseUrl);
        System.out.println(obj.getTitle());
        Thread.sleep(5000);
        obj.quit();


    }
}
