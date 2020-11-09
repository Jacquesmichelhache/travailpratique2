class CustomersController < ApplicationController
  before_action :set_customer, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  # GET /customers
  # GET /customers.json
  def index


    
    @customers = current_user.customers.all
 
  end

  # GET /customers/1
  # GET /customers/1.json
  def show
 
  end

  # GET /customers/new
  def new
    @customer = Customer.new
  end

  # GET /customers/1/edit
  def edit
  end

  # POST /customers
  # POST /customers.json
  def create
    
    @customer = current_user.customers.build(customer_params)

    respond_to do |format|
      if @customer.save
        format.html { redirect_to @customer, notice: 'Customer was successfully created.' }
        format.json { render :show, status: :created, location: @customer }
      else
        format.html { render :new }
        format.json { render json: @customer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /customers/1
  # PATCH/PUT /customers/1.json
  def update
    respond_to do |format|
      if @customer.update(customer_params)
        flash[:success]  = "Customer was successfully updated."
        format.html { redirect_to root_path }
        format.json { render :show, status: :ok, location: @customer }
      else
        format.html { render :edit }
        format.json { render json: @customer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /customers/1
  # DELETE /customers/1.json
  def destroy
    begin
      @customer.destroy

      respond_to do |format|
        flash[:success]  = "Customer was successfully destroyed."
        format.html { redirect_to customers_url}
        format.json { head :no_content }
      end
    rescue ActiveRecord::DeleteRestrictionError 
      flash[:danger]  = "Cannot delete a customer with contacts"
      redirect_to root_path
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_customer
      @customer = Customer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def customer_params
      params.require(:customer).permit(:name, :relationshipstart, :addresscity, :addresspostalcode, :addressstreet, :addressapt, :activitytype, :infoemail)
    end
end
