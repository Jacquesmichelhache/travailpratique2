class Customer < ApplicationRecord

  #relations
  belongs_to :user
  has_many :contacts, dependent: :restrict_with_exception 

  @@activitytypes = { technology: "technology", food: "food", industrial: "industrial", entertainment: "entertainment", other: "other" }

  enum activitytype: @@activitytypes


  #validations
  before_validation :upcase_email 

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i  
  validates :infoemail, presence: {message: "Email cannot be blank"}, length:{maximum:255},
      format: { with: VALID_EMAIL_REGEX , message: "Email format is invalid" }

  VALID_AREACODE_REGEX = /\A[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}[ -]?\d{1}[A-Z]{1}\d{1}\z/i  
  validates :addresspostalcode, 
      format: { with: VALID_AREACODE_REGEX, message: "postal code is invalid" }
 
  validates  :name, presence: {message: "A name must be defined"}
  validates  :relationshipstart, presence: {message: "A start date must be chosen"}
  validates  :activitytype, presence: {message: "An activity type must be chosen"}
  validates :addressapt, length:{maximum:12, message: "Apt value has more then 12 characters"} 


  def activitytypes_for_select
    @@activitytypes.to_a 
  end

  #methods
  def self.get_customer_data
    return Customer.all.collect{|x| x.attributes}.to_json
  end

  private
    def upcase_email
      self.infoemail = infoemail.upcase
    end


    
end
