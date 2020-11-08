class StaticPagesController < ApplicationController

  def home()
    if user_signed_in?      
      @customers = current_user.customers.all  
      redirect_to customers_path
    else   
      redirect_to  new_user_session_path
    end
  end

end
