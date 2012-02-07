#coding: utf-8

module AlbumsHelper
  def album_type_value flag
    if flag==0
      'プライベートアルバム'  
    elsif flag == 1
      '公開アルバム'
    elsif flag == 2
      '漫画'
    else
      'プライベートアルバム'
    end
  end 

end
