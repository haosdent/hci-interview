class User::SessionsController < Devise::SessionsController

  include Devise::Controllers::Patchs

  protect_from_forgery :except => :create
  prepend_before_filter :authenticate_user!, :except => [:create, :get_current_user]
  prepend_before_filter :set_csrf_header, :only => [:create, :get_current_user]

  def get_current_user
    @user = current_user
    render :json => @user
  end

end
