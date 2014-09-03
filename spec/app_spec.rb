#require 'coveralls'
#Coveralls.wear!

ENV['RACK_ENV'] = 'test'

require './app/api'
require 'rspec'
require 'rack/test'
require 'json'

describe 'API' do
  
  include Rack::Test::Methods

  def app
    API
  end

  it "list" do
    get '/api/v1/tasks'
    expect(last_response).to be_ok
    expect(JSON.parse(last_response.body).length).to eq(2)
  end

  it "show" do
    get '/api/v1/tasks/1'
    expect(last_response).to be_ok
    expect(JSON.parse(last_response.body)).to eq({"id"=>1, "title"=>"title1", "desc"=>"desc1", "done"=> true})
  end

  it "create" do
    post '/api/v1/tasks', {:title=>"title3",:desc=>"desc3",:done=>false}.to_json
    expect(JSON.parse(last_response.body)).to eq({"status"=>"ok"})
    
    get '/api/v1/tasks'
    expect(JSON.parse(last_response.body).length).to eq(3)
  end

  it "update" do
    put '/api/v1/tasks/3', {:done=>true}.to_json
    expect(JSON.parse(last_response.body)).to eq({"status"=>"ok"})
 
    get '/api/v1/tasks/3'
    expect(last_response).to be_ok
    expect(JSON.parse(last_response.body)).to eq({"id"=>3,"title"=>"title3","desc"=>"desc3", "done"=> true})
  end

  it "delete" do
    delete '/api/v1/tasks/3'
    expect(JSON.parse(last_response.body)).to eq({"status"=>"ok"})
 
    get '/api/v1/tasks'
    expect(last_response).to be_ok
    expect(JSON.parse(last_response.body).length).to eq(2)
  end


end
