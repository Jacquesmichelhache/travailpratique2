class ApplicationController < ActionController::Base
  before_action :set_cache_headers


  def after_sign_out_path_for(resource_or_scope)
    logout_path   
  end

  def after_sign_in_path_for(resource_or_scope)
    root_path   
  end

  # def after_inactive_sign_up_path_for(resource)
  # end

  # This method is called whenever a CSRF token is invalid.
  def handle_unverified_request
    
    # By default this method raises ActionController::InvalidAuthenticityToken
    #redirect_to root_url
  end

  private
    # Confirms a logged-in user.
    def logged_in_user
      if user_signed_in? then
        
      else
        redirect_to root_path
      end   
      
    end

    def set_cache_headers
      response.headers["Cache-Control"] = "no-cache, no-store"
      response.headers["Pragma"] = "no-cache"
      response.headers["Expires"] = "Mon, 01 Jan 1990 00:00:00 GMT"
    end
  
end
