class StaticPagesController < ApplicationController

  def home
    
    if user_signed_in?     
      #redirect to user customer list
    else      
      flash.discard
     
      #do nothing, home page IS the login page
    end

  end

  def password_reset

  end

  def logout

  end

  
end
