Rails.application.routes.draw do  
  root 'static_pages#home'
  
  devise_for :users, controllers:{sessions:'users/sessions',
          registrations:'users/registrations',
          passwords:'users/passwords'}    

  get '/logout', to: 'static_pages#logout'  
  get '/password_reset', to: 'static_pages#password_reset'

  get '/customers', to: 'customers#show' #returns a view with all the customers
  post '/customers', to: 'customers#create'
  delete '/customers/delete', to: 'customers#destroy'


  post '/customers/edit', to: 'customers#edit'
  post '/customers/update' , to: 'customers#update'
  #post '/customer/find', to: 'customers#find'   #this causes error for some reason. pls advise Jacques as to why
  
  
end