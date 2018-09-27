/* feedreader.js
 * (Special thanks to Matthew Cranford and Mohammed's excellent and helpful walk throughs!)
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
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
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('Are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('Url defined in each feed',() => {
           for(let feed of allFeeds){
             expect (feed.url).toBeDefined();
             //expect (typeOf feed.url).toBe('string');
             expect (feed.url.length).not.toBe(0);
           }

         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Defined names in each feed', () => {
           for (let j in allFeeds){
             expect(allFeeds[j].name).toBeDefined();
             //expect(typeOf allFeeds[j].name).toBe('string');
             expect(allFeeds[j].name).not.toBe('');
           }
         });
    });

//Test Suit 2.
    /* TODO: Write a new test suite named "The menu" */
    describe ('The Menu', () => {


        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyz e the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it ('Invisible', () => {
           const body = document.querySelector('body');
           expect (body.classList.contains ('menu-hidden')).toBe(true);
         });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
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
    /* TODO: Write a new test suite named "Initial Entries" */
describe('Initial entries', () => {


        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach((done) => {
           loadFeed(0, done);
         });
         it('Completes the work', () => {
           const feed = document.querySelector('.feed');
           expect (feed.children.length > 0).toBe(true);
         });
});
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('Initial Entries', () => {
         beforeEach( (done) => {
             loadFeed(0, () => {
                 done();
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
     * Describe test suite "New Feed Selection"
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

        it('Should load new feed', (done) => {
            const secondFeed = $('.feed').html();
            expect(secondFeed).not.toBe(firstFeed);
            done();
        });
    });
}());
