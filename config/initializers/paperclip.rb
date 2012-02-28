module Paperclip
  # Handles thumbnailing images that are uploaded.
  class Thumbnail < Processor

    def transformation_command
      p 'File Format'
      p @current_format.upcase
      p @file.size

      scale, crop = @current_geometry.transformation_to(@target_geometry, crop?)
      trans = []
      trans << "-coalesce" if animated?
     # convert -define jpeg:size=180x120 -resize 180x120 src.jpg dst.jpg
      if jpg_file?
        trans << "-define jpeg:size="+ %["#{scale}"] unless scale.nil? || scale.empty? 
      end
      trans << "-resize" << %["#{scale}"] unless scale.nil? || scale.empty?
      trans << "-crop" << %["#{crop}"] << "+repage" if crop
      trans
    end
   
    def jpg_file?
      if @current_format !=nil && @current_format.length >0 && ".JPG"== @current_format.upcase 
        p "JPEG FILE."
        true
      else
        false
      end
    end
  end
end
