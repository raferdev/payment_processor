class Blacklist < ApplicationRecord
    validates :user, presence: true
end
