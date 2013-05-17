# cucumber --tags=@events

Given /^I am on the page$/ do
	 visit '/'	
end


Then /^I see the bottom tool bar$/ do
	page.should have_content "Events"
	page.should have_content "Add Event"
	page.should have_content "Profile"
end

And /^I should click add event button$/ do
# 	Capybara.default_wait_time = 5
	find(".add_event_page").click
# 	click_link "Add Event"
	
end
		
 

 