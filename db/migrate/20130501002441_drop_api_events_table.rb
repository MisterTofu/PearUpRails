class DropApiEventsTable < ActiveRecord::Migration
  def up
    drop_table :api_events
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
