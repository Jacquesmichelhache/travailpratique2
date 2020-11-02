class StaticPagesController < ApplicationController

  def home()
    if params[:reset] == nil then
      @reset = 0

      
      if params[:panel] == nil then
        @panel = ""
      else
        @panel = params[:panel]
      end

    else
      @reset = params[:reset]
    end
   
   

    if user_signed_in?     
      #redirect to user customer list
      redirect_to customers_path
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
