Rails.application.routes.draw do  
  root 'static_pages#home'

  #Overrides devise defaults. Redirects invalid login for user scope
  #devise_scope :user do
    #get '/users/sign_in', to: 'static_pages#home'
  #end 

  #Overrides devise defaults. Redirects invalid login for global scope
  #get "/users/sign_in", to: 'static_pages#home'
  
  devise_for :users, controllers:{sessions:'users/sessions',
          registrations:'users/registrations',
          passwords:'users/passwords'}   
  


 
  get '/logout', to: 'static_pages#logout'  
  get '/password_reset', to: 'static_pages#password_reset'
 
end