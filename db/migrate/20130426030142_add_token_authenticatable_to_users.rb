class AddTokenAuthenticatableToUsers < ActiveRecord::Migration
  def change    
#         add_column :users, :token_authenticatable, :string
        add_column :users, :authentication_token, :string
  end
end