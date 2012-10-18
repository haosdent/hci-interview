class User::OpinionsController < User::SessionsController

  prepend_before_filter :authenticate_admin!
  prepend_before_filter :prevent_current_user!

  def create
    @user = User.find(params[:id])
    @inspect = @user.inspects.find(params[:inspectId])
    @opinion = Opinion.new(params[:opinion])
    @opinion.creator_id = current_user.id
    @inspect.opinions.push(@opinion)
    render :json => @opinion
  end

  def show_all
    @user = User.find(params[:id])
    @inspect = @user.inspects.find(params[:inspectId])
    @opinions = @inspect.opinions
    render :json => @opinions
  end

  def show
    @user = User.find(params[:id])
    @inspect = @user.inspects.find(params[:inspectId])
    @opinion = @inspect.opinions.find(params[:opinionId])
    render :json => @opinion
  end

  def delete
    @user = User.find(params[:id])
    @inspect = @user.inspects.find(params[:inspectId])
    @opinion = @inspect.opinions.find(params[:opinionId])
    @opinion.delete
    render :json => @opinion
  end

  def edit
    @user = User.find(params[:id])
    @inspect = @user.inspects.find(params[:inspectId])
    @opinion = @inspect.opinions.find(params[:opinionId])
    @opinion.creator_id = current_user.id
    @opinion.update_attributes(params[:opinion])
    render :json => @opinion
  end

end
