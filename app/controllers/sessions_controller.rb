class SessionsController < ApplicationController
  def callback
    auth = request.env["omniauth.auth"]
    p auth
    @user=User.find_by_provider_and_uid(auth["provider"],auth["uid"]) || User.create_with_omniauth(auth)
p @user
    session[:user_id]=@user.id
    redirect_to root_url,:notice=>"Sign in!"
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url,:notice=>"Sign out!!"
  end
end
