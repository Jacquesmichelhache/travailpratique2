class Contact < ApplicationRecord
 belongs_to :customer

 validates  :name, presence: {message: "A start date must be chosen"}
 validates  :firstname, presence: {message: "An activity type must be chosen"}
 validates  :email, presence: {message: "An activity type must be chosen"}

 VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i  
 validates :email, presence: {message: "Email cannot be blank"}, length:{maximum:255},
      format: { with: VALID_EMAIL_REGEX , message: "Email format is invalid" }

 validates :ext, numericality: true


end
