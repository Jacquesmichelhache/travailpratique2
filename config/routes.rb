Rails.application.routes.draw do  
  root 'static_pages#home'
  
  #Authentication
  devise_for :users, controllers:{sessions:'users/sessions',
          registrations:'users/registrations',
          passwords:'users/passwords'}    

  get '/logout', to: 'static_pages#logout'  
  get '/password_reset', to: 'static_pages#password_reset'


  #Customers
  get '/customers', to: 'customers#show' #returns a view with all the customers
  post '/customers', to: 'customers#create'
  delete '/customers/delete', to: 'customers#destroy'
  post '/customers/edit', to: 'customers#edit'
  post '/customers/update' , to: 'customers#update'
  post '/customers/all', to: 'customers#all' #ajax for retrieving all customers from user
  post '/customers/creationform', to: 'customers#creationform'
  post '/customers/editform', to: 'customers#editform'
 
  #Contacts
  delete '/contacts/delete', to: 'contacts#destroy'
  post   '/contacts/new', to: 'contacts#new'
  post '/contacts/create', to: 'contacts#create'
  post '/contacts/all_contacts', to: 'contacts#all_contacts'

  
end