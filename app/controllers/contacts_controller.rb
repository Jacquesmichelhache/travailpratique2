class ContactsController < ApplicationController


  #GET
  def show 


  end
 

  #POST
  def customer_contacts
    begin
      customer_id = params[:customer_id]
      customer = Customer.find(customer_id)
      render  json:{operation_status:"success", value:customer.contacts.to_json}  
    rescue Exception => e
      render  json:{operation_status:"error", error_message: e.message}  
    end
  end

  #POST 
  def new   

    begin
     
      @customer = Customer.find(params[:customer_id])
      
      @new_contact = @customer.contacts.build()
    
      render  json: {operation_status:"success", 
        value: render_to_string(partial: 'contacts/new_form',
          :formats => [:html], 
          layout: false, 
          locals: {:@new_contact => @new_contact, :@customer => @customer}),        
      }    
     
    rescue Exception => e
      render  json:{operation_status:"error", error_message: e.message}  
    end

  end

  #POST
  def create

    begin
      customer_id = params[:customer_id]
      p = contact_params

      #validate the model before commiting the changes
      customer = Customer.find(customer_id)
      new_contact = customer.contacts.build(p)  

      if new_contact.valid? then

        new_contact.save
        respond_to do |format|
          format.json { render json:{status: :valid}}        
        end
      else
        
        respond_to do |format|
          format.json { render json:{status: :invalid, errors: new_contact.errors}}        
        end
      end

    rescue Exception => e
      render  json:{operation_status:"error", error_message: e.message,customer_id:customer_id, customer:customer, p:p }  
    end
  end


  #POST
  def editform   

    begin
      @cont= Contact.find(params[:contact_id])

      render  json: {operation_status:"success", 
        htmlString: render_to_string(partial: 'contacts/edit_form',:formats => [:html], layout: false, locals:{:@contact => @cont})
      }
    rescue Exception => e
      render  json:{operation_status:"error", error_message: e.message}  
    end

  end

  #POST
  def update
  
    p = contact_params
   
    if current_user != nil then
      contact = Contact.find(params[:contact_id])

      if contact != nil then
        if contact.update(p) then
          respond_to do |format|
            format.json { render json:{status: :valid, value: contact.to_json}}        
          end
        else
          respond_to do |format|
            format.json { render json:{status: :invalid, errors: contact.errors}}        
          end
        end
      else

      end      
    else
      render  json:{ operation_status:"error", error_message:"Fatal internal error: current_user is nil"}  
    end

  end

  #DELETE  
  def destroy
    # params[:customerId] and params[:contactId]    

    begin
      Contact.find(params[:contact_id] ).destroy 

      customer =  Customer.find(params[:customer_id] )

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

  private
    def contact_params
      params.require(:contact).permit(:name, :firstname, :email,
        :tel, :ext)
    end



end
