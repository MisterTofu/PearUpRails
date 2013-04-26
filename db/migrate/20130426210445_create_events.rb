class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.text :activity
      t.text :description
      t.integer :max_attend
      t.integer :cur_attend
      t.integer :host_id
      t.date :date
      t.time :time_start
      t.time :time_end
      t.string :location
      t.timestamps
    end
  end
end
