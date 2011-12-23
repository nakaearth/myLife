class Photo < ActiveRecord::Base
  belongs_to :album
  scope :latest  ,order('updated_at desc')
  validates :title  ,:presence=>true
  has_attached_file :photo,:url=>":rails_root/public:url",:url=>"/system/img/:attaches/:id/:style/:filename" , :styles => { :medium => "300x300>", :thumb => "100x100>" }
end
