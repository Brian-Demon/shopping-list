Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: "home#index"

  get "/auth/:provider/callback" => "sessions#create"
  get "/logout" => "sessions#destroy", :as => :logout
  
  resources :options do
    post :update_display_location, on: :member
  end

  resources :lists do
    post :remove_bought, on: :member
  end
  resources :items do
    post :remove, on: :member
  end
end