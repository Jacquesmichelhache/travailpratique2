Rails.application.routes.draw do  
  root 'static_pages#home'
  
  #Authentication
  devise_for :users, controllers:{sessions:'users/sessions',
          registrations:'users/registrations',
          passwords:'users/passwords'}    

  get '/logout', to: 'static_pages#logout' #view 
  get '/password_reset', to: 'static_pages#password_reset' #view
  

  #Customers
  get '/customers', to: 'customers#show' #view
  post '/customers', to: 'customers#create' #ajax 
  delete '/customers/delete', to: 'customers#destroy' #ajax 
  post '/customers/update' , to: 'customers#update' #ajax 
  post '/customers/all', to: 'customers#all' #ajax 
  post '/customers/creationform', to: 'customers#creationform' #ajax 
  post '/customers/editform', to: 'customers#editform' #ajax 
 
  #Contacts
  delete '/contacts/delete', to: 'contacts#destroy' #ajax   
  post '/contacts/create', to: 'contacts#create' #ajax 
  post '/contacts/customer_contacts', to: 'contacts#customer_contacts' #ajax 
  post '/contacts/update', to: 'contacts#update' #ajax 
  post '/contacts/editform', to: 'contacts#editform' #ajax 
  post '/contacts/createForm', to: 'contacts#createForm' #ajax 

  

  
end