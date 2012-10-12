class User::AdminsController < User::SessionsController

  prepend_before_filter :authenticate_admin!

  def show_all
    @users = User.all
    render :json => @users
  end

  def show
    @user = User.find(params[:id])
    render :json => @user
  end

  def delete
    @user = User.find(params[:id])
    @user.destroy
    render :json => @user
  end

  def update
    @user = User.find(params[:id])
    @user.update_attributes(params[:user])
    render :json => @user
  end

end
