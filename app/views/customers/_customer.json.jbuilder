json.extract! customer, :id, :name, :relationshipstart, :addresscity, :addresspostalcode, :addressstreet, :addressapt, :activitytype, :infoemail, :created_at, :updated_at
json.url customer_url(customer, format: :json)
