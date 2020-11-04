class CustomersController < ApplicationController  
  before_action :authenticate_user!
  
  #GET
  def show   
    @customers =  current_user.customers
    @customer_data = @customers.collect{|x| x.attributes}.to_json

    @new_customer = current_user.customers.build
  
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

  end

  #POST
  def create

    p = customer_params
    

    begin
      p[:relationshipstart] = DateTime.strptime(p[:relationshipstart], "%m/%d/%Y")  
    rescue
    ensure
      new_customer = current_user.customers.build(p)
    end
   
   

    if new_customer.valid? then
      new_customer.save

      respond_to do |format|
        format.json { render json:{status: :valid}}        
      end
    else
      respond_to do |format|
        format.json { render json:{status: :invalid, errors: new_customer.errors}}        
      end
    end   
 
  end



  private
    def customer_params
      params.require(:customer).permit(:name, :relationshipstart, :addresscity,
        :addresspostalcode, :addressstreet, :addressapt, :activitytype,
      :infoemail)
    end

end
