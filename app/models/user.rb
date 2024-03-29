class User
  include Mongoid::Document
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  attr_accessible :email, :password, :remember_me, :name, :student_id, :mobile, :inspects

  ## Database authenticatable
  field :email,              :type => String, :default => ""
  field :encrypted_password, :type => String, :default => ""

  field :name,               :type => String
  field :student_id,         :type => String
  field :mobile,             :type => String
  field :passed,             :type => Boolean, :default => false
  field :admin,              :type => Boolean, :default => false

  embeds_many :inspects, cascade_callbacks: true

  validates_presence_of :email
  validates_presence_of :encrypted_password
  validates_presence_of :name
  validates_presence_of :student_id
  validates_presence_of :mobile
  validates_uniqueness_of :email, :case_sensitive => false

  ## Recoverable
  field :reset_password_token,   :type => String
  field :reset_password_sent_at, :type => Time

  ## Rememberable
  field :remember_created_at, :type => Time

  ## Trackable
  field :sign_in_count,      :type => Integer, :default => 0
  field :current_sign_in_at, :type => Time
  field :last_sign_in_at,    :type => Time
  field :current_sign_in_ip, :type => String
  field :last_sign_in_ip,    :type => String

  ## Confirmable
  field :confirmation_token,   :type => String
  field :confirmed_at,         :type => Time
  field :confirmation_sent_at, :type => Time
  field :unconfirmed_email,    :type => String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, :type => Integer, :default => 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    :type => String # Only if unlock strategy is :email or :both
  # field :locked_at,       :type => Time

  ## Token authenticatable
  # field :authentication_token, :type => String

  ## Normal field

end

class Inspect
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Converters

  field :content, :type => String

  belongs_to :user, :foreign_key => 'creator_id'
  def creator
    User.find(creator_id)
  end

  embedded_in :user
  embeds_many :opinions, cascade_callbacks: true

end

class Opinion
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Converters

  field :content, :type => String

  belongs_to :user, :foreign_key => 'creator_id'
  def creator
    User.find(creator_id)
  end

  embedded_in :inspect

end
