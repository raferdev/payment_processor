class Postbody
    include ActiveModel::Model

    attr_accessor :user_id , :transaction_id , :merchant_id ,  :card_number , :transaction_date , :transaction_amount ,  :device_id
    
    validates_presence_of :user_id , :transaction_id , :merchant_id ,  :card_number , :transaction_date , :transaction_amount ,  :device_id
end
