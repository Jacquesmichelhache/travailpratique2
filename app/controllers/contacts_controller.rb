class ContactsController < ApplicationController


  #GET
  def show 


  end
 

  #POST
  def all_contacts
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
        contactForm: render_to_string(partial: 'contacts/new_form',
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
    customer_id = params[:customer_id]
    p = create_contact_params

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

  private
    def create_contact_params
      params.require(:create_contact).permit(:name, :firstname, :email,
        :tel, :ext)
    end



end
