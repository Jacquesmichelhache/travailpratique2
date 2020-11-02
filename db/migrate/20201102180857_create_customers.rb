class CreateCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :customers do |t|
      t.string :name, default:""
      t.datetime :relationshipstart, null:false
      t.string :addresscity, default:""
      t.string :addresspostalcode, default:""
      t.string :addressstreet, default:""
      t.string :addressapt, default: "" 
      t.integer :activitytype, default: 0
      t.string :infoemail, default: ""  
     
      t.timestamps
    end
  end
end
