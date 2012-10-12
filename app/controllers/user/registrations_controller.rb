class User::RegistrationsController < Devise::RegistrationsController

  include Devise::Controllers::Patchs

  protect_from_forgery :except => :create
  #prepend_before_filter :authenticate_user!, :except => :create
  prepend_before_filter :set_csrf_header, :only => :create

end
