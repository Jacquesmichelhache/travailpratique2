class ApplicationController < ActionController::Base
  before_action :set_cache_headers
  before_action :set_route_information
  

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

  def customers_path

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

      @routes =  {test: "hello"}
    end

    def set_route_information
      @routes =  {
        :root_url => root_url,
        :customers_delete_path => customers_delete_path,
        :customers_edit_url => customers_edit_url,
        :customers_all_path => customers_all_path,
        :customers_all_url => customers_all_url,
        :customers_creation_form_url => customers_creationform_url,
        :customers_creation_form_path => customers_creationform_path,
        :customers_edit_form_path => customers_editform_path,
        :customers_edit_form_url => customers_editform_url

       
        }
    end
  
end
