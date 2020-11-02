class CustomersController < ApplicationController  
  before_action :authenticate_user!
  
  def show
    @customers = Customer.all


    @coldef_arr = [
    {"headerName" => "Name", "field" => "name" , "resizable" => true},
    {"headerName" => "Start Date", "field" => "relationshipstart", "resizable" => true},
    {"headerName" => "Activity Type", "field" => "activitytype", "resizable" => true},
    {"headerName" => "Email Info", "field" => "infoemail", "resizable" => true}]

    @customer_data = Customer.get_customer_data()

  end


 

end
