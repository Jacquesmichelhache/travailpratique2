class CustomersController < ApplicationController  
  before_action :authenticate_user!
  
  #GET
  def show   
    @customers =  current_user.customers
    @customer_data = @customers.collect{|x| x.attributes}.to_json

    @new_customer = current_user.customers.build
    @new_customer.name = "haha"
  end

  #DELETE
  def destroy
    
    id = params[:id]   
    
    begin
      current_user.customers.find(id).destroy        
      render  json:{operation_status:"success", error_message:"customer successfully removed"}    

    rescue ActiveRecord::RecordNotFound
      render  json:{ operation_status:"error", error_message:"customer not found in database"}
    rescue ActiveRecord::DeleteRestrictionError 
      render  json:{ operation_status:"error", error_message:"Cannot remove a customer with contacts"}
    rescue ActiveRecord::RecordNotDestroyed
      render  json:{ operation_status:"error", error_message:"Cannot delete a customer that has contacts!"}  
    rescue

  end

  #POST
  def create
    # new_customer = params[:new_customer]

    # render  json:{operation_status:"success", error_message:"customer successfully removed"} 
    respond_to do |format|

      format.json {render json:{operation_status:"success", 
        error_message:"customer successfully removed",
        status: :unprocessable_entity}   }        
    end

  end

end
