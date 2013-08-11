PearUp2::Application.routes.draw do
  authenticated :user do
    root :to => 'home#index'
  end
  root :to => "home#index"
  devise_for :users
  resources :users
#   match '/cordova_plugins.json' => "home"
  
  
	namespace :api do
    	resources :tokens, :only => [:create, :destroy]
    	resources :events, :only => [:create, :destroy, :view, :single]
    	match 'tokens' => 'tokens#create'
    	match 'events' => 'events#create'
    	match 'viewevents' => 'events#view'
    	match 'singleevent' => 'events#single'
    	match 'profiles' => 'profiles#view'
    end
end