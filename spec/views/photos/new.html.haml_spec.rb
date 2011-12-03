require 'spec_helper'

describe "photos/new.html.haml" do
  before(:each) do
    assign(:photo, stub_model(Photo,
      :title => "MyString",
      :point => 1,
      :user_id => 1,
      :description => "MyText"
    ).as_new_record)
  end

  it "renders new photo form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => photos_path, :method => "post" do
      assert_select "input#photo_title", :name => "photo[title]"
      assert_select "input#photo_point", :name => "photo[point]"
      assert_select "input#photo_user_id", :name => "photo[user_id]"
      assert_select "textarea#photo_description", :name => "photo[description]"
    end
  end
end
