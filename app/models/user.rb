class User < ApplicationRecord
  before_save :downcase_email
  has_many :customers
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable


  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  
  validates :email, presence: true, length:{maximum:255},
      format: { with: VALID_EMAIL_REGEX },
        uniqueness:true



  private
    # Converts email to all lower-case.
    def downcase_email
      self.email = email.downcase
    end
end
