class CustomersController < ApplicationController  
  include ApplicationHelper

  before_action :authenticate_user!
  
  #GET
  def show 
  end



  #POST
  def all

    if current_user != nil then  
      value = current_user.customers.collect{|x| x.attributes}
      render json: success("Successfully retrieved customers",value)      
    else
      render json: fail("no user is logged in") 
    end

  end  

  #DELETE
  def destroy
    
    id = params[:id]   
    
    begin
      current_user.customers.find(id).destroy     
      render json: success("Customer successfully removed",nil)  
    rescue ActiveRecord::RecordNotFound
      render json: fail("Customer not found in database")       
    rescue ActiveRecord::DeleteRestrictionError 
      #An assumption is made here that the customer has contacts
      render json: fail("Cannot remove a customer with contacts")      
    rescue ActiveRecord::RecordNotDestroyed
      render json: fail("Cannot delete a customer that has contacts!")
    rescue
      render json: fail("Unable to delete customer. Contact administrator")     
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
          render json: success("Successfully updated customer", customer)            
        else
          render json: fail("Unable to save changes", customer.errors )       
        end
      else

      end      
    else
      render json: fail("Fatal internal error: current_user is nil")        
    end

  end


  #POST
  def creationform

    @new_customer = current_user.customers.build()

    begin
      htmlString = render_to_string(partial: 'customers/new_customer_form',:formats => [:html], layout: false, locals:{:@new_customer => @new_customer})
      render json: success("Creation form successfully generated",htmlString)
    
    rescue Exception => e
      render json: fail(e.message)   
    end

  end

  def editform   

    begin
      @cust = current_user.customers.find(params[:id])
      htmlString = render_to_string(partial: 'customers/edit_customer_form',:formats => [:html], layout: false, locals:{:@cust => @cust})
      render json: success("successfully retrieved customer information", htmlString)

    rescue Exception => e
       render json: fail("Error retrieving customer information") 
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
      render json: success( "Successfully created a customer", nil)      
    else    
      render json: fail("Error creating customer",new_customer.errors)  
    end   
 
  end



  private
    def customer_params
      params.require(:customer).permit(:name, :relationshipstart, :addresscity,
        :addresspostalcode, :addressstreet, :addressapt, :activitytype,
      :infoemail)
    end  

end
