module ApplicationHelper

  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end

  def client_dto(status,value_in)
    return {sucess: status,
    data:{value:value_in}
    }
  end

  def success(message_in = "", value_in = {})
    return {status:"success",data:{value:value_in,message: message_in}}
  end

  def fail(message_in, value_in = {})
    return {status:"error", data:{value: value_in, message:message_in}}
  end

 
  
end
