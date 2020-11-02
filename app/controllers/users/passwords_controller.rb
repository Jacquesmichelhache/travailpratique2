# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  # GET /resource/password/new
  # def new
  #   super
  # end

  # POST /resource/password
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      flash.clear  
      respond_with({}, location: after_sending_reset_password_instructions_path_for(resource_name))
    else
      #respond_with(resource)

      resource.errors.full_messages.each {|x| flash[x] = x}
      redirect_to root_path
    end
  end

  #GET /resource/password/edit?reset_password_token=abcdef
  def edit
    self.resource = resource_class.new
    set_minimum_password_length
    resource.reset_password_token = params[:reset_password_token]

   # redirect_to root_path(panel:"password_edit")    
  end

  # PUT /resource/password
  # def update
  #   super
  # end

   protected
  def after_resetting_password_path_for(resource)
    root_path
  end

  #The path used after sending reset password instructions
  def after_sending_reset_password_instructions_path_for(resource_name)
    #session[:password_reset] = "true"
    #root_path
    root_path(panel:"password_reset")
    
  end
end
