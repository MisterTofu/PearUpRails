class CreateUserEvents < ActiveRecord::Migration
  def change
    create_table :user_events do |t|
      t.integer :event_id
      t.integer :user_id

      t.timestamps
    end
  end
end
