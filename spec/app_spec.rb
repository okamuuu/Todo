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
    get '/api/v1/items'
    expect(last_response).to be_ok
    expect(JSON.parse(last_response.body).length).to eq(2)
  end

  it "show" do
    get '/api/v1/items/1'
    expect(last_response).to be_ok
    expect(JSON.parse(last_response.body)).to eq({"id"=>1, "url"=>"http://www.yahoo.co.jp"})
  end

  it "create" do
    post '/api/v1/items', {"url"=>"http://www.apple.com/"}.to_json
    expect(JSON.parse(last_response.body)).to eq({"status"=>"ok"})
    
    get '/api/v1/items'
    expect(JSON.parse(last_response.body).length).to eq(3)
  end

  it "update" do
    put '/api/v1/items/3', {"url"=>"http://www.facebook.com/"}.to_json
    expect(JSON.parse(last_response.body)).to eq({"status"=>"ok"})
 
    get '/api/v1/items/3'
    expect(last_response).to be_ok
    expect(JSON.parse(last_response.body)).to eq({"id"=>3,"url"=>"http://www.facebook.com/"})
  end

  it "delete" do
    delete '/api/v1/items/3'
    expect(JSON.parse(last_response.body)).to eq({"status"=>"ok"})
 
    get '/api/v1/items'
    expect(last_response).to be_ok
    expect(JSON.parse(last_response.body).length).to eq(2)
  end


end
