class Customer < ApplicationRecord
  enum activitytype: { active: 0, archived: 1 }



  def self.get_customer_data
    return Customer.all.collect{|x| x.attributes}.to_json
  end

end
