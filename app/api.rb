require 'grape'

class API < Grape::API
  prefix 'api'
  version 'v1', using: :path
  format :json

  @@items = [
    {id: 1, url:'http://www.yahoo.co.jp'},
    {id: 2, url:'http://www.google.com'}
  ]
  
  @@last_index = 2
  
  resource :items do
    get '/' do
      @@items
    end

    get '/:id' do
      for item in @@items
        if item[:id] == params[:id].to_i
          return item
        end
      end

      # TOOD: 404
      return {}
    end

    post '/' do
      data = JSON.parse(request.body.string)
      @@last_index += 1
      @@items.push({
        :id => @@last_index,
        :url => data['url']
      })
      {status:"ok"} 
    end 

    put '/:id' do
      data = JSON.parse(request.body.string)
      for item in @@items
        if item[:id] == params[:id].to_i
          item[:url] = data['url']
          return {status:"ok"}
        end
      end
     
      {status:"ng"} 
    end 

  end

end

