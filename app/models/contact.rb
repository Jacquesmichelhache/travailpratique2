class Contact < ApplicationRecord
  belongs_to :customer

 validates  :name, presence: {message: "A name must be defined"}
 validates  :firstname, presence: {message: "A first name must be defined"}

 VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i  
 validates :email, presence: {message: "Email cannot be blank"}, length:{maximum:255},
      format: { with: VALID_EMAIL_REGEX , message: "Email format is invalid" }

 validates :ext, numericality: {message:"Extension must be of numerical value"}
 
end
