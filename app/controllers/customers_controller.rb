class CustomersController < ApplicationController  
  before_action :authenticate_user!
  
  
  def show   
    @customers =  current_user.customers
    @customer_data = @customers.collect{|x| x.attributes}.to_json
  end

  #DELETE
  def destroy
    
    id = params[:id]   
    
    begin
      current_user.customers.find(id).destroy        
      render  json:{:id => id, operation_status:"success", error_message:"customer successfully removed"}    

    rescue ActiveRecord::RecordNotFound
      render  json:{:id => id, operation_status:"error", error_message:"customer not found in database"}
    rescue ActiveRecord::DeleteRestrictionError 
      render  json:{:id => id, operation_status:"error", error_message:"Cannot remove a customer with contacts"}
    rescue ActiveRecord::RecordNotDestroyed
      render  json:{:id => id, operation_status:"error", error_message:"Cannot delete a customer that has contacts!"}  
    rescue

  end

end
 

end
