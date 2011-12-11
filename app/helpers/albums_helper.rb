#coding: utf-8

module AlbumsHelper
  def public_value flag
    if flag==0
      '非公開'  
    else
      '公開'
    end
  end 
end
