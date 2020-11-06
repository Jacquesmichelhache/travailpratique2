class ContactsController < ApplicationController
  include ApplicationHelper

  #GET
  def show 


  end
 

  #POST
  def customer_contacts
    begin
      customer_id = params[:customer_id]
      customer = Customer.find(customer_id)
      render json: success("Successfully retrieves customer contacts", customer.contacts) 
    rescue Exception => e
      render json: fail(e.message) 
    end
  end

  #POST 
  def createForm   

    begin
     
      @customer = Customer.find(params[:customer_id])
      
      @new_contact = @customer.contacts.build()
    
      htmlString = render_to_string(partial: 'contacts/new_form', :formats => [:html], layout: false, 
                                      locals: {:@new_contact => @new_contact, :@customer => @customer})

      render json: success("Successfully retrieved contact form", htmlString)        
    rescue Exception => e
      render json: fail(e.message)  
    end

  end

  #POST
  def editform   

    begin
      @cont= Contact.find(params[:contact_id])

      htmlString = render_to_string(partial: 'contacts/edit_form',:formats => [:html], layout: false, locals:{:@contact => @cont})
      render json: success("Successfully retrieved contact information", htmlString) 
     
    rescue Exception => e
      render json: fail(e.message)        
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
        render json: success("Contact saved", nil)         
      else
        render json: fail("Unable to create contact",new_contact.errors)          
      end

    rescue Exception => e
      render json: fail("Unable to create contact",e.message)       
    end
  end

  #POST
  def update
  
    p = contact_params
   
    if current_user != nil then
      contact = Contact.find(params[:contact_id])

      if contact != nil then
        if contact.update(p) then
          render json: success("Contact saved", contact) 
        else
          render json: fail("Unable to create contact", contact.errors)
        end
      else

      end      
    else
      render json: fail("Fatal internal error: current_user is nil")     
    end

  end

  #DELETE  
  def destroy    

    begin
      Contact.find(params[:contact_id] ).destroy 

      customer =  Customer.find(params[:customer_id] )
      render json: success("Contact successfully removed", customer.contacts.collect{|x| x.attributes}) 
     
    rescue ActiveRecord::RecordNotFound
      render json: fail("Contact not found in database")  
     
    rescue ActiveRecord::DeleteRestrictionError 
      #An assumption is made here that the customer has contacts
      render json: fail("Deletion of this contact is restricted")       
    rescue ActiveRecord::RecordNotDestroyed
      render json: fail("Contact could not be deleted. contact admin")    
    rescue Exception => e
      render json: fail(e.message)     
    end

  end



  private
    def contact_params
      params.require(:contact).permit(:name, :firstname, :email,
        :tel, :ext)
    end

end
