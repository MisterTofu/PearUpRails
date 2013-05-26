@login
Feature: Login
	In order to use the application
	A User
	Should be able to login
	
@javascript
	Scenario: Logging In
		Given I am on the login page
		Then I should see the login form
		And I should login
		Then I should see the Event page