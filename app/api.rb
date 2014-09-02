require 'grape'

class API < Grape::API
  prefix 'api'
  version 'v1', using: :path
  format :json

  @@items = [
    {id: 1, url:'http://www.yahoo.co.jp'},
    {id: 2, url:'http://www.google.com'}
  ]

  get :hello do
    { hello: "world" }
  end

  resource :items do
    get '/' do
      @@items
    end

    get '/:id' do
      puts params.id      

      for item in @@items
        puts 'item: '
        puts item[:id]
        if item[:id] == params.id.to_i
          puts 'hoge'
          return item
        end
      end

      return {}
    end
  end


end

