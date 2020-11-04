Rails.application.routes.draw do  
  root 'static_pages#home'
  
  devise_for :users, controllers:{sessions:'users/sessions',
          registrations:'users/registrations',
          passwords:'users/passwords'}    

  get '/logout', to: 'static_pages#logout'  
  get '/password_reset', to: 'static_pages#password_reset'

  get '/customers', to: 'customers#show'
  post '/customers', to: 'customers#create'
  delete '/customers/delete', to: 'customers#destroy'
  
end