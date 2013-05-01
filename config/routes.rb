PearUp2::Application.routes.draw do
  authenticated :user do
    root :to => 'home#index'
  end
  root :to => "home#index"
  devise_for :users
  resources :users

  
  
	namespace :api do
    	resources :tokens, :only => [:create, :destroy]
    	resources :events, :only => [:create, :destroy, :view]
    	match 'tokens' => 'tokens#create'
    	match 'events' => 'events#create', :via => [:get, :post]
    	match 'viewevents' => 'events#view'
    end
end