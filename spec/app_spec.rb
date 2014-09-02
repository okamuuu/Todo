#require 'coveralls'
#Coveralls.wear!

ENV['RACK_ENV'] = 'test'

require './app/api'
require 'rspec'
require 'rack/test'

describe 'API' do
  
  include Rack::Test::Methods

  def app
    API
  end

  describe 'items/' do
    it "should return items" do
      get '/api/v1/items'
      expect(last_response).to be_ok
      expect(JSON.parse(last_response.body).length).to eq(2)
    end
  end

  describe 'items/1' do
    it "should return items" do
      get '/api/v1/items/1'
      expect(last_response).to be_ok
      expect(JSON.parse(last_response.body)).to eq({"id"=>1, "url"=>"http://www.yahoo.co.jp"})
    end
  end

end
