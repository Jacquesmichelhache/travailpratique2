class ApplicationController < ActionController::Base
  

  def after_sign_out_path_for(resource_or_scope)
    logout_path   
  end

  def after_sign_in_path_for(resource_or_scope)
    root_path   
  end

  def after_inactive_sign_up_path_for(resource)

  end





  private
  # Confirms a logged-in user.
  def logged_in_user
    if user_signed_in? then
      
    else
      redirect_to root_path
    end   
    
  end
  
end
