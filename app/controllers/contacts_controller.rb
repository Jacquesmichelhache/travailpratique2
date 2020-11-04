class ContactsController < ApplicationController


  #GET
  def show 


  end

  #POST
  def edit


  end

  #POST
  def update


  end


  #DELETE  
  def destroy
    # params[:customerId] and params[:contactId]    

    begin
      Contact.find(params[:contactId] ).destroy 

      customer =  Customer.find(params[:customerId] )

      render  json:{operation_status:"success", 
        error_message:"Contact successfully removed",
      contacts: customer.contacts.collect{|x| x.attributes}.to_json} 

    rescue ActiveRecord::RecordNotFound
      render  json:{ operation_status:"error", error_message:"Contact not found in database"}
    rescue ActiveRecord::DeleteRestrictionError 
      #An assumption is made here that the customer has contacts
      render  json:{ operation_status:"error", error_message:"Deletion of this contact is restricted"}
    rescue ActiveRecord::RecordNotDestroyed
      render  json:{ operation_status:"error", error_message:"Contact could not be deleted. contact admin"}  
    rescue Exception => e
      render  json:{operation_status:"error", error_message: e.message}  
    end

  end




end
