package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import static constants.locators.HomePageConstants.*;

public class HomePage extends BasePage{

    private By searchField = By.xpath(SEARCH_FIELD);
    private By searchButton = By.xpath(SEARCH_BUTTON);
    private By manufYearStart = By.xpath(MANUFACTURED_YEAR_START);
    private By manufYearEnd = By.xpath(MANUFACTURED_YEAR_END);
    private By manufList = By.className(MANUFACTURED_LIST);

    public HomePage(WebDriver driver) {
        super(driver);
    }

    public void setManufYearStart(String year) {
        click(manufYearStart);
        WebElement years = getElement(manufList);
        years.findElement(By.linkText(year)).click();
    }

    public void setSearchKeyword(String keyword) {
        sendKeys(searchField, keyword);
    }

    public SearchResultsPage clickSearchButton(){
        click(searchButton);
        return new SearchResultsPage(driver);
    }


}
