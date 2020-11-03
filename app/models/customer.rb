class Customer < ApplicationRecord
  #relations
  belongs_to :user
  has_many :contacts, dependent: :restrict_with_exception 

  enum activitytype: { active: 0, archived: 1 }


  #validations
  before_validation :upcase_email
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i  
  validates :infoemail, presence: true, length:{maximum:255},
      format: { with: VALID_EMAIL_REGEX }

  VALID_AREACODE_REGEX = /\A[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}[ -]?\d{1}[A-Z]{1}\d{1}\z/i  
  validates :addresspostalcode, 
      format: { with: VALID_AREACODE_REGEX }

  validates  :relationshipstart, presence: true
  validates  :activitytype, presence: true
  validates :addressapt, length:{maximum:12}


  #methods
  def self.get_customer_data
    return Customer.all.collect{|x| x.attributes}.to_json
  end

  private
    def upcase_email
      self.infoemail = infoemail.upcase
    end

end
