module Mongoid
  module Converters

    def creator_id
      id = super
      creator = nil

      creator = User.find(id).name if id != nil
      return creator
    end

  end
end
