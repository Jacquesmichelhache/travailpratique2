Rails.application.routes.draw do  
  root 'static_pages#home'

  #Authentication
  devise_for :users  

  resources :users  
  resources :customers
  resources :contacts 
  
end