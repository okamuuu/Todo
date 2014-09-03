require 'grape'

class API < Grape::API
  prefix 'api'
  version 'v1', using: :path
  format :json

  @@tasks = [
    {id: 1, title: 'title1', desc: 'desc1', done: true},
    {id: 2, title: 'title2', desc: 'desc2', done: true},
  ]
  
  @@last_index = 2
  
  resource :tasks do
    get '/' do
      @@tasks
    end

    get '/:id' do
      for task in @@tasks
        if task[:id] == params[:id].to_i
          return task
        end
      end

      # TOOD: 404
      return {}
    end

    post '/' do
      data = JSON.parse(request.body.string)
      @@last_index += 1
      @@tasks.push({
        :id    => @@last_index,
        :title => data['title'],
        :desc  => data['desc'],
        :done  => data['done']
      })
      {status:"ok"} 
    end 

    put '/:id' do
      data = JSON.parse(request.body.string)
      for task in @@tasks
        if task[:id] == params[:id].to_i
          task[:title] = data['title'] if data['title']
          task[:desc] = data['desc'] if data['desc']
          task[:done] = data['done'] if data['done']
          return {status:"ok"}
        end
      end
     
      {status:"ng"} 
    end 

    delete '/:id' do
      @@tasks.each_with_index do |task, index|
        if task[:id] == params[:id].to_i
          @@tasks.delete_at(index)
          return {status:"ok"}
        end
      end
     
      {status:"ng"} 
    end 

  end

end

