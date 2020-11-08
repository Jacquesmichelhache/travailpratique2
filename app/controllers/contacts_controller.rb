class ContactsController < ApplicationController
  before_action :set_contact, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!


  # GET /contacts
  # GET /contacts.json
  def index
    
    @customer = Customer.find(params[:customer_id])
    @contacts = @customer.contacts.all    
   
  end

  # GET /contacts/1
  # GET /contacts/1.json
  def show
  end

  # GET /contacts/new
  def new
    @customer = Customer.find(params[:customer_id])
    @contact = Contact.new
  end

  # GET /contacts/1/edit
  def edit
    @customer = Customer.find(params[:customer_id])
  end

  # POST /contacts
  # POST /contacts.json
  def create    
    @customer = Customer.find(params[:customer_id])
    @contact = @customer.contacts.build(contact_params)

    respond_to do |format|
      if @contact.save
        flash[:success]  = "Contact was successfully created."
        format.html { redirect_to contacts_url(customer_id: params[:customer_id])}
        format.json { render :show, status: :created, location: @contact }
      else
        format.html { render :new }
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /contacts/1
  # PATCH/PUT /contacts/1.json
  def update  

    respond_to do |format|
      if @contact.update(contact_params)
        flash[:success]  = "Contact was successfully updated."
        format.html { redirect_to contacts_url(customer_id: params[:customer_id]) }
        format.json { render :show, status: :ok, location: @contact }
      else
        format.html { render :edit }
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /contacts/1
  # DELETE /contacts/1.json
  def destroy

    @contact.destroy
    respond_to do |format|
      flash[:success]  = "Contact was successfully destroyed."
      format.html { redirect_to contacts_url(customer_id: params[:customer_id])}
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contact
      @contact = Contact.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def contact_params
      params.require(:contact).permit(:name, :firstname, :email, :tel, :ext)
    end
end
