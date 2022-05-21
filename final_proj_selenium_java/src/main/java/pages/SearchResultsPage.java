package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import static constants.locators.SearchPageConstants.CAR_PRICE;
import static constants.locators.SearchPageConstants.CAR_YEAR;


public class SearchResultsPage extends BasePage{

    private By carPrice = By.className(CAR_YEAR);
    private By carYear = By.className(CAR_PRICE);

    public SearchResultsPage(WebDriver driver) {
        super(driver);
    }


    public String getCarYear() {
        return getText(carYear);
    }
    public String getCarPrice() {
        return getText(carPrice);
    }





}
