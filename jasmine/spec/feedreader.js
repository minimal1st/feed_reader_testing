/* 
feedreader.js

This is the spec file that Jasmine will 
read and contains all of the tests that 
will be run against the application. 

We're placing all of our tests within the 
$() function, since some of these tests 
may require DOM elements. 

We want to ensure they don't run until the 
DOM is ready. 

*/

$(function() {

	/* This is our first test suite - a test suite just contains
	a related set of tests. This suite is all about the RSS
	feeds definitions, the allFeeds variable in our application. */

	var feed = $('.feed');

	describe('RSS Feeds', function() {

		/* This is our first test - it tests to make sure that the
		allFeeds variable has been defined and that it is not
		empty. */

		beforeEach(function(done){
			feed.empty();
			done();
		});	

		it('The variable allFeeds is defined and non-empty.', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* This test loops through each feed in the allFeeds object and ensures that it has a defined and non-empty URL. */

		it('All feeds have defined and non-empty URLs.', function(){
			allFeeds.forEach(function(feed){
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			});
		});

		/* This test loops through each feed in the allFeeds object and ensures they have defined and non-empty names. */

		it('All feeds have defined and non-empty names', function(){
				allFeeds.forEach(function(feed){
					expect(feed.name).toBeDefined();
					expect(feed.name.length).not.toBe(0);
				});
		});
	});

	describe('The menu', function() {

		/* menuIcon and menuElementIsHidden are variables used
		in the following two tests. */

		var menuIcon = $('.menu-icon-link');

		/* The following test ensures the menu element is 
		hidden by default. */

		it('The menu is hidden by default.', function(){
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		/* This test ensures that whenever the menu icon is clicked, the visibility of the menu also changes. */

		it('The visibility of the menu changes when icon is clicked.', function(){
			menuIcon.click();
			expect($('body').hasClass('menu-hidden')).toBe(false);
			menuIcon.click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});
		
	/* A test suite named "Initial Entries" */

	describe('Initial Entries', function(){
		/* 
		The following test makes sure that whenever the loadFeed
		function is called and completes it works, there is at least
		a single .entry element within the .feed containers. 

		Remember, loadFeed() is asynchronous so this test will require 
		the use of Jasmine's beforeEach and asynchronous done(). 
		*/

		beforeEach(function(done){
			feed.empty();
			done();
		});

		it('There is at least one entry in the feed after loadFeed() is called.', function(done){
			loadFeed(0, function(){
				expect($('.feed .entry').length).toBeGreaterThan(0);
				done();
			});
		});
	});

	/* A new test suited called 'New Feed Selection' */
	describe('New Feed Selection', function(){

		var contentIsTheSame; 
		var FeedAfterFirstCall, FeedAfterSecondCall;
		var contentIsTheSame, contentHasChanged;
		var feed = $('.feed');

		beforeEach(function(done){
			loadFeed(0, function(){
				FeedAfterFirstCall = $('.feed').html();
				loadFeed(1, function(){
					FeedAfterSecondCall = $('.feed').html();
					done(); 
				});
			});
		});

		/* The following test checks whether calling loadFeed() creates at 
		least one entry element within the .feed container. */    
		it('Calling loadFeed() creates at least one element in feed.', 
			function(done) {
				feedAfterOneCall = $('.feed').html();
				loadFeed(0)
				expect($('.feed .entry').length).toBeGreaterThan(0);
				done();
			}
		);		
		
		/* Test checking if the content of .feed is changed after calling loadFeed() */    
		it('Content changes whenever loadFeed() is called, even if there is already content in feed', function(done) {
			contentIsTheSame = (FeedAfterFirstCall == FeedAfterSecondCall);
			expect(contentIsTheSame).toBe(false);
			done();
		});
	});
})();