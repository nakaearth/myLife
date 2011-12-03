require 'spec_helper'

describe "albums/index.html.haml" do
  before(:each) do
    assign(:albums, [
      stub_model(Album,
        :title => "Title",
        :user_id => 1,
        :public_flag => 1,
        :description => "MyText"
      ),
      stub_model(Album,
        :title => "Title",
        :user_id => 1,
        :public_flag => 1,
        :description => "MyText"
      )
    ])
  end

  it "renders a list of albums" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
