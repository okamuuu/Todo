require './lib/grn'
require './lib/grn'
require 'rspec'

describe 'Hash' do

  it "should" do
    Grn::tmpdb do
      hash = Grn::Hash.new 
      hash.add("aaa", text:"aaa", number:1)
      expect(hash.size).to eq(1)

      hash["bbb"] = {text:"bbb", number:2}

      expect(hash.size).to eq(2)
    end 
  end

  it "should" do
    Grn::tmpdb do
      hash = Grn::Hash.new 

      hash["a"] = {text:"aaa", number:1}
      hash["b"] = {text:"bbb", number:2}
      hash["c"] = {text:"ccc", number:3}

      results = hash.select("text:@bb")

      puts results.first.key.key
      puts results.first.text

      expect(1==1).to be_truthy
    end 
  end

end
