# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create a main sample user.
User.create!(email: "jacques_m16@hotmail.com",
  password: "123456",
  password_confirmation: "123456")

  
  Customer.create!(name: "bercomac",
  relationshipstart: Time.zone.now,
  addresscity: "addresscity",
  addresspostalcode: "addresspostalcode",
  addressstreet: "addressstreet",
  addressapt: "addressapt",
  activitytype: Customer::activitytypes[:active],
  infoemail: "infoemail")

  Customer.create!(name: "Usinage STI",
  relationshipstart: Time.zone.now,
  addresscity: "addresscity",
  addresspostalcode: "addresspostalcode",
  addressstreet: "addressstreet",
  addressapt: "addressapt",
  activitytype: Customer::activitytypes[:active],
  infoemail: "infoemail")

  Customer.create!(name: "Precicom",
    relationshipstart: Time.zone.now,
    addresscity: "addresscity",
    addresspostalcode: "addresspostalcode",
    addressstreet: "addressstreet",
    addressapt: "addressapt",
    activitytype: Customer::activitytypes[:active],
    infoemail: "infoemail")
