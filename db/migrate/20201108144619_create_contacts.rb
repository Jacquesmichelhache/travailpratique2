class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :firstname
      t.string :email
      t.string :tel
      t.string :ext

      t.references :customer, null: false, foreign_key: true    

      t.timestamps
    end
  end
end
