import org.testng.annotations.Test;
import pages.HomePage;
import pages.SearchResultsPage;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

public class SearchTest extends BaseTest {


    @Test
    public void validSearch() {
        HomePage homePage = new HomePage(driver);
        homePage.setManufYearStart("2000");
        SearchResultsPage searchResultsPage = homePage.clickSearchButton();
        assertTrue(Integer.parseInt(searchResultsPage.getCarPrice()) > 2000 , "Manufacturing year should be higher or equal");
    }



}
