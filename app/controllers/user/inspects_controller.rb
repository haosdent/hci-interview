class User::InspectsController < User::SessionsController

  prepend_before_filter :authenticate_admin!

  def create
    @user = User.find(params[:id])
    @inspect = Inspect.new(params[:inspect])
    @inspect.creator_id = current_user.id
    @user.inspects.push(@inspect)
    render :json => @inspect
  end

  def show_all
    @user = User.find(params[:id])
    @inspects = @user.inspects
    render :json => @inspects
  end

  def show
    @user = User.find(params[:id])
    @inspect = @user.inspects.find(params[:inspectId])
    render :json => @inspect
  end

  def delete
    @user = User.find(params[:id])
    @inspect = @user.inspects.find(params[:inspectId])
    @inspect.delete
    render :json => @inspect
  end

  def edit
    @user = User.find(params[:id])
    @inspect = @user.inspects.find(params[:inspectId])
    @inspect.creator_id = current_user.id
    @inspect.update_attributes(params[:inspect])
    render :json => @inspect
  end

end
