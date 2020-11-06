class CustomersController < ApplicationController  
  before_action :authenticate_user!
  
  #GET
  def show 
  end



  #POST
  def all

    if current_user != nil then
      render  json:{operation_status:"success", 
        value: current_user.customers.collect{|x| x.attributes}.to_json}  
    else
      render  json:{operation_status:"error", 
        error_message: "no user is logged in"}  
    end

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
      #An assumption is made here that the customer has contacts
      render  json:{ operation_status:"error", error_message:"cannot remove a customer with contacts"}
    rescue ActiveRecord::RecordNotDestroyed
      render  json:{ operation_status:"error", error_message:"cannot delete a customer that has contacts!"}  
    rescue
      render  json:{ operation_status:"error", error_message:"unable to delete customer. Contact administrator"}  
    end

  end

  #POST
  def update

    #get filtered parameters
    p = customer_params

   
    if current_user != nil then
      customer = current_user.customers.find(params[:id]);

      if customer != nil then
        if customer.update(p) then
          respond_to do |format|
            format.json { render json:{status: :valid, value: customer.to_json}}        
          end
        else
          respond_to do |format|
            format.json { render json:{status: :invalid, errors: customer.errors}}        
          end
        end
      else

      end      
    else
      render  json:{ operation_status:"error", error_message:"Fatal internal error: current_user is nil"}  
    end

  end


  #POST
  def creationform

    @new_customer = current_user.customers.build()

    begin
    render  json: {operation_status:"success", 
      htmlString: render_to_string(partial: 'customers/new_customer_form',:formats => [:html], layout: false, locals:{:@new_customer => @new_customer})
    }
    rescue Exception => e
      render  json:{operation_status:"error", error_message: e.message}  
    end

  end

  def editform   

    begin
      @cust = current_user.customers.find(params[:id])

      render  json: {operation_status:"success", 
        htmlString: render_to_string(partial: 'customers/edit_customer_form',:formats => [:html], layout: false, locals:{:@cust => @cust})
      }
    rescue Exception => e
      render  json:{operation_status:"error", error_message: e.message}  
    end

  end


  #POST
  def create
    p = customer_params

    #validate the model before commiting the changes
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
