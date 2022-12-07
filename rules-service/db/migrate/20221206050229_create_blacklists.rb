class CreateBlacklists < ActiveRecord::Migration[7.0]
  def change
    create_table :blacklists do |t|
      t.integer :user

      t.timestamps
    end
  end
end
