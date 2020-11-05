# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create a main sample user.
User.create!(
  email: "jacques_m16@hotmail.com",
  password: "123456",
  password_confirmation: "123456")

  

user = User.first

5.times do |x|  
  user.customers.create!(name: "Bercomac-#{x+1}",
    relationshipstart: Time.zone.now,
    addresscity: "addresscity",
    addresspostalcode: "E1A7S8",
    addressstreet: "addressstreet",
    addressapt: "addressapt",
    activitytype: Customer::activitytypes[:technology],
    infoemail: "jacques@dsda.com")

end

customers = user.customers

customers.each{ |customer|
  5.times do 
    customer.contacts.create!(name: "Hache",
      firstname: "Jacques",
      email: "jacques_m16@hotmail.com",
      tel: "1-506-608-6195",
      ext: "2248"
    )
  end
}


10.times do
  
  user.customers.create!(name: "customer with no contacts",
    relationshipstart: Time.zone.now,
    addresscity: "addresscity",
    addresspostalcode: "E1A7S8",
    addressstreet: "addressstreet",
    addressapt: "addressapt",
    activitytype: Customer::activitytypes[:technology],
    infoemail: "jacques@dsda.com")
  
end
  










