require 'spec_helper'

describe "albums/edit.html.haml" do
  before(:each) do
    @album = assign(:album, stub_model(Album,
      :title => "MyString",
      :user_id => 1,
      :public_flag => 1,
      :description => "MyText"
    ))
  end

  it "renders the edit album form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => albums_path(@album), :method => "post" do
      assert_select "input#album_title", :name => "album[title]"
      assert_select "input#album_user_id", :name => "album[user_id]"
      assert_select "input#album_public_flag", :name => "album[public_flag]"
      assert_select "textarea#album_description", :name => "album[description]"
    end
  end
end
