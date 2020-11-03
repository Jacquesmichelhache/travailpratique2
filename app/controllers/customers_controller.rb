class CustomersController < ApplicationController  
  before_action :authenticate_user!
  
  def show
    @customers = Customer.all


    @coldef_arr = [
    {"headerName" => "Name", "field" => "name" , "resizable" => true},
    {"headerName" => "Start Date", "field" => "relationshipstart", "resizable" => true, "type" => "dateColumn"},
    {"headerName" => "Activity Type", "field" => "activitytype", "resizable" => true},
    {"headerName" => "Email Info", "field" => "infoemail", "resizable" => true}]

    @customer_data = Customer.get_customer_data()

  end

  #DELETE
  def destroy
    id = params[:id]  

    render  json:{:id => id, check:"hello"}
  end


 

end
