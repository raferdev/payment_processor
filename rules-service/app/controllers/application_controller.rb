class ApplicationController < ActionController::API

def body
  @body = Postbody.new
  end

  def rules
    @body = Postbody.new(postbody_params)

    if request.headers["authorization"] != ENV['INTERN_TOKEN'] then
      render json: {"code": "A1","message": "Fail Authentication"}, status:401
    elsif !@body.valid?
      render json: {"code": "B1" ,"message": "Unprocessable entity."}, status: 422
    elsif Blacklist.where('user': params[:user_id]).take then
      render json: {"code": "C1","transaction_id": params[:transaction_id]}, status:406
    end
  end

  private

    def postbody_params 
      params.permit( :user_id , :transaction_id , :merchant_id ,  :card_number , :transaction_date , :transaction_amount ,  :device_id) 
      end
end