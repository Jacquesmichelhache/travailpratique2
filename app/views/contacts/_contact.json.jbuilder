json.extract! contact, :id, :name, :firstname, :email, :tel, :ext, :created_at, :updated_at
json.url contact_url(contact, format: :json)
