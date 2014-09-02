require 'grape'

class API < Grape::API
  prefix 'api'
  version 'v1', using: :path
  format :json

  get :hello do
    { hello: "world" }
  end
end

