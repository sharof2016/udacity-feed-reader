/* feedreader.js

* (Special thanks to Matthew Cranford and Mohammed's excellent and helpful walk throughs!)
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against the application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
//Test Suit 1.
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds',  () =>  {
    /* This is our first test - it tests to make sure that the
    * allFeeds variable has been defined and that it is not
    * empty.
    */
    it('Are defined', () => {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Here we are writing a test that loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */

    it('Url defined in each feed',() => {
      for(let feed of allFeeds){
        expect (feed.url).toBeDefined();
        expect (feed.url.length).not.toBe(0);
      }

    });

    /* This test loops through each feed
    * in the allFeeds object and ensures it has a name defined
    * and that the name is not empty.
    */
    it('Defined names in each feed', () => {
      for (let j in allFeeds){
        expect(allFeeds[j].name).toBeDefined();
        expect(allFeeds[j].name).not.toBe('');
      }
    });
  });

  //Test Suit 2.
  /* Here we are writing a new test suite named "The menu" */
  describe ('The Menu', () => {


    /* This test that ensures the menu element is
    * invisible by default.
    */
    it ('Invisible', () => {
      const body = document.querySelector('body');
      expect (body.classList.contains ('menu-hidden')).toBe(true);
    });
    /* In this test the menu changes
    * visibility when the menu icon is clicked. This test
    * have two expectations: menu displays when
    * clicked and it hides when clicked again.
    */
    it ('Toggles on and off', () => {
      const body = document.querySelector('body');
      const menu = document.querySelector('.menu-icon-link');
      menu.click();
      expect (body.classList.contains ('menu-hidden')).toBe(false);
      menu.click();
      expect (body.classList.contains ('menu-hidden')).toBe(true);
    });
  });

  //Test Suit 3.
  /* This is a new test suite named "Initial Entries" */
  describe('Initial entries', () => {


    /* And here we are writing a test that ensures when the loadFeed
    * function is called and completes its work, and there is at least
    * a single .entry element within the .feed container.
    */
    beforeEach((done) => {
      loadFeed(0, done);
    });
    it('Completes the work', () => {
      const feed = document.querySelector('.feed');
      expect (feed.children.length > 0).toBe(true);
    });
  });
  /** Test after loadFeed function,
  * the HTML should contains at least a feed with entry
  */

  it('Should loadFeed and render the entry and .feed container', () => {
    expect($('.feed').has('.entry').length).not.toBe(0);
  });
});


/**
* Describe test suite named "New Feed Selection"
*/
describe("New Feed Selection", () => {
  let firstFeed;

  beforeEach((done) => {
    // load first feed
    loadFeed(0, () => {
      firstFeed = $('.feed').html();

      // Load second feed
      loadFeed(1, () => {
        done();
      });
    });
});

  //Here we can see two different entries being compared from the first and second feed.
  it('Should load new feed', (done) => {
    const secondFeed = $('.feed').html();
    expect(secondFeed).not.toBe(firstFeed);
    done();
  });
});
}());
