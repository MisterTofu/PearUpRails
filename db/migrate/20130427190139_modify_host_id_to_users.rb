class ModifyHostIdToUsers < ActiveRecord::Migration
  def up
  	remove_column :users, :host_id
  	remove_column :users, :date
  	add_column :users, :host_id, :string
  end

  def down
  	remove_column :users, :host_id
  	add_column :users, :date, :date
  	add_column :users, :host_id, :integer
  end
end
