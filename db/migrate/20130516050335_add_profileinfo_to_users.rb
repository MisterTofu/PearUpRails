class AddProfileinfoToUsers < ActiveRecord::Migration
  def change
    add_column :users, :firstname, :string
    add_column :users, :lastname, :string
    add_column :users, :phone, :string
    add_column :users, :age, :integer
    add_column :users, :city, :string
    add_column :users, :state, :string
    add_column :users, :zipcode, :integer
    add_column :users, :school, :string
  end
end
