class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.string :firstname
      t.string :lastname
      t.string :phone
      t.integer :age
      t.string :city
      t.string :state
      t.integer :zipcode
      t.string :school

      t.timestamps
    end
  end
end
