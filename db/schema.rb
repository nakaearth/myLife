# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120223150638) do

  create_table "album_show_histories", :force => true do |t|
    t.integer  "user_id"
    t.integer  "album_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "user_name"
  end

  create_table "albums", :force => true do |t|
    t.string   "title"
    t.integer  "user_id"
    t.integer  "album_type"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "album_date"
    t.integer  "event_id"
  end

  add_index "albums", ["user_id", "album_date"], :name => "index_albums_on_user_id_and_album_date"
  add_index "albums", ["user_id", "album_type", "updated_at"], :name => "index_albums_on_user_id_and_album_type_and_updated_at"

  create_table "events", :force => true do |t|
    t.string   "name"
    t.datetime "start_at"
    t.datetime "end_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.string   "event_description"
  end

  add_index "events", ["user_id"], :name => "index_events_on_user_id"

  create_table "photos", :force => true do |t|
    t.string   "title"
    t.integer  "point"
    t.integer  "user_id"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.integer  "album_id"
    t.string   "message"
  end

  add_index "photos", ["user_id"], :name => "index_photos_on_user_id"

  create_table "taggings", :force => true do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.integer  "tagger_id"
    t.string   "tagger_type"
    t.string   "context",       :limit => 128
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id"], :name => "index_taggings_on_tag_id"
  add_index "taggings", ["taggable_id", "taggable_type", "context"], :name => "index_taggings_on_taggable_id_and_taggable_type_and_context"

  create_table "tags", :force => true do |t|
    t.string "name"
  end

  create_table "users", :force => true do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "image_path"
    t.string   "token"
    t.string   "secret"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["uid"], :name => "index_users_on_uid"

end
