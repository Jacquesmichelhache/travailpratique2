class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.string :name, default:""
      t.string :firstname, default:""
      t.string :email, default:""
      t.string :tel, default:""
      t.string :ext, default:""

      t.references :user, null: false, foreign_key: true    
    

      t.timestamps
    end
    
  end
end
