class User::AdminsController < User::SessionsController

  prepend_before_filter :authenticate_admin!
  prepend_before_filter :prevent_current_user!

  def show_all
    @users = User.all
    render_with_filter :json => @users, :filter => method(:inspects_filter)
  end

  def show
    @user = User.find(params[:id])
    render_with_filter :json => @user, :filter => method(:inspects_filter)
  end

  def delete
    @user = User.find(params[:id])
    @user.destroy
    render_with_filter :json => @user, :filter => method(:inspects_filter)
  end

  def update
    @user = User.find(params[:id])

    user = params[:user]
    @user[:passed] = user[:passed] if user[:passed] != nil
    @user[:admin] = user[:admin] if user[:admin] != nil
    @user.save

    @user.update_attributes(params[:user])
    render_with_filter :json => @user, :filter => method(:inspects_filter)
  end

end
