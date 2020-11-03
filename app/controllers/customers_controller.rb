class CustomersController < ApplicationController  
  before_action :authenticate_user!
  
  
  def show   
    @customers =  current_user.customers
    @customer_data = @customers.collect{|x| x.attributes}.to_json
  end

  #DELETE
  def destroy
    id = params[:id]      

    render  json:{:id => id, check:"hello"}
  end


 

end
