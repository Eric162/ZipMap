package com.seleniumsimplified.webdriver;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class map_view_test

{
    @Test
    public void main()
    {
        System.setProperty("webdriver.chrome.driver", "/Users/divyasharma/Downloads/chromedriver");
        WebDriver driver = new ChromeDriver();
        String url = "http://localhost:3000";
        driver.get(url);
        System.out.println(url);
        driver.manage().window().maximize();
        String title = "ZipMap";
        String actual = driver.getTitle();
        if(title.equals(actual)) {
            System.out.println("Success");
        } else {
            System.out.println("Failed");
        }
        driver.close();
    }

    @Test
    //tests the functionality of the Go button
    public void testGoButton() {
        System.setProperty("webdriver.chrome.driver", "/Users/divyasharma/Downloads/chromedriver");
        WebDriver driver = new ChromeDriver();
        String url = "http://localhost:3000";
        driver.get(url);
        //verify Go button is displayed
        boolean buttonPresent = driver.findElement(By.cssSelector("input[type='button'][value='Go']")).isDisplayed();
        System.out.println(buttonPresent);
        WebElement textBox = driver.findElement(By.id("zip"));
        textBox.clear();
        textBox.sendKeys("04758");
        //verify go button is displayed and enabled
        boolean goEnabled = driver.findElement(By.cssSelector("input[type='button'][value='Go']")).isEnabled();
        if (buttonPresent && goEnabled) {
            driver.findElement(By.cssSelector("input[type='button'][value='Go']")).click();
        }
        driver.findElement(By.cssSelector("input[type='button'][value='Go']")).getCssValue("top");
        driver.close();
    }

    @Test
    //tests when zip code typed in, navigates to highlighted location
    public void testGetZipData() {
        System.setProperty("webdriver.chrome.driver", "/Users/divyasharma/Downloads/chromedriver");
        WebDriver driver = new ChromeDriver();
        String url = "http://localhost:3000";
        driver.get(url);
        driver.findElement(By.id("zip")).sendKeys("04758");
        String s = driver.findElement(By.id("zip")).getText();
        Assert.assertEquals(s, "");
        driver.findElement(By.cssSelector("input[type='button'][value='Go']")).click();
        Assert.assertEquals(driver.findElement(By.className("leaflet-tile-container")).getLocation().toString(),
                "(8, 98)");
        driver.close();
    }

    /*FIXME*/
    @Test
    public void testTextInZipField() {
        System.setProperty("webdriver.chrome.driver", "/Users/divyasharma/Downloads/chromedriver");
        WebDriver driver = new ChromeDriver();
        String url = "http://localhost:3000";
        driver.get(url);
        driver.findElement(By.id("zip")).sendKeys("04758");
        driver.findElement(By.cssSelector("input[type='button'][value='Go']")).click();
        boolean textFound = false;
        try {
            driver.findElement(By.xpath("//*[contains(text(),'04578')]"));
            textFound = true;
        } catch (Exception e) {
            textFound = false;
        }
        driver.close();
    }

    @Test
    //tests the length of the zip code is less than 5 numbers
    public void testZipLength() {
        System.setProperty("webdriver.chrome.driver", "/Users/divyasharma/Downloads/chromedriver");
        WebDriver driver = new ChromeDriver();
        String url = "http://localhost:3000";
        driver.get(url);
        //tests page does not change when zip code is < 5
        driver.findElement(By.id("zip")).sendKeys("04");
        driver.findElement(By.cssSelector("input[type='button'][value='Go']")).click();
        Assert.assertEquals(driver.findElement(By.className("leaflet-tile-loaded")).getAttribute("style"),
                "height: 256px; width: 256px; left: 326px; top: 233px;");
        driver.close();
    }
}