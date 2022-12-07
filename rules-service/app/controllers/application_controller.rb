class ApplicationController < ActionController::API
  def getBlacklist
    @user = Blacklist.all
    render json: @user
  end

  def rules
    if Blacklist.where('user': params[:user_id]).take then
      render json: {"code": "C1","transaction_id": params[:transaction_id]}, status:406
    end
  end
end
  