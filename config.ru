require 'grape'
require './app/api.rb'

use Rack::Static, 
  :index => 'index.html',
  :urls => ["/images", "/js", "/css", "/components"],
  :root => "public"

run Rack::Cascade.new [API]
