# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :profile do
    firstname ""
    lastname ""
    phone ""
    age ""
    city ""
    state ""
    zipcode ""
    school "MyString"
  end
end
