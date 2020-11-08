class CreateCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :customers do |t|
      t.string :name, default:""
      t.datetime :relationshipstart, null:false
      t.string :addresscity, default:""
      t.string :addresspostalcode
      t.string :addressstreet, default:""
      t.string :addressapt, default: "" 
      t.string :activitytype
      t.string :infoemail
     
      t.references :user, null: false, foreign_key: true  

      t.timestamps
    end
  end
end
