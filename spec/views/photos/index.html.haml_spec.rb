require 'spec_helper'

describe "photos/index.html.haml" do
  before(:each) do
    assign(:photos, [
      stub_model(Photo,
        :title => "Title",
        :point => 1,
        :user_id => 1,
        :description => "MyText"
      ),
      stub_model(Photo,
        :title => "Title",
        :point => 1,
        :user_id => 1,
        :description => "MyText"
      )
    ])
  end

  it "renders a list of photos" do
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
