# cucumber --tags=@events

# Given /^I am on the page$/ do
# 	 visit '/'	
# end
# 
# 
# Then /^I see the bottom tool bar$/ do
# # 	puts page.html
# 	page.should have_content "Events"
# 	page.should have_content "Add Event"
# 	page.should have_content "Profile"
# 
# end
# 
# And /^I should click add event button$/ do
# # 	Capybara.default_wait_time = 5
# 	find(".add_event_page").click
# # 	click_link "Add Event"
# 	
# end
# 		
 
 

Given /^I am on the login page$/ do
	 visit '/'	
	page.should have_content "Login"
end


Then /^I should see the login form$/ do

	page.should have_content "Email"
	
end

And /^I should login$/ do
	fill_in('Email', :with => 'user@example.com')
	fill_in('Password', :with => 'password')
	Capybara.default_wait_time = 5
	click_button "Login"
end


Then /^I should see the Event page$/ do
puts page.html
end

 