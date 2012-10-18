module Devise
  module Controllers
    module Patchs

      def set_csrf_header
        headers['CSRF-Token'] = form_authenticity_token
      end

      def authenticate_user!(*args)
        if current_user == nil
          flash[:alert] = I18n.t("devise.failure.unauthenticated")
          respond_with current_user
        end
      end

      def authenticate_admin!
        if current_user == nil or current_user.admin == false
          flash[:alert] = I18n.t("devise.failure.unauthenticated")
          respond_with current_user
        end
      end

      def build_tip(object)
        #TODO
        if object != {}
          object[:error] = object.errors.as_json if object.errors.as_json.length > 0
        end
        object[:flash] = flash.each{} if flash.each{}.length > 0
      end

      def inspects_filter(resource)
        if resource != nil and current_user != nil
          resource = resource.as_json
          if resource.class == Array
            resource.map! do |e|
              e.delete('inspects') if e['_id'] == current_user[:_id]
              e
            end
          elsif resource.class == Hash
            resource.delete('inspects') if resource['_id'] == current_user[:_id]
          end
        end

        return resource
      end

      def respond_with(*resources, &block)
        resource = resources[0]
        resource = {} unless resource
        build_tip resource
        resource = inspects_filter resource

        status = resources.extract_options![:location] if resources
        if status == nil
          status = (resource[:error] and resource[:error].length > 0? 400 : 200)
        end
        render :json => resource, :status => status
      end

      def render_with_filter(options = {})
        resource = options[:filter].call options[:json]
        render :json => resource
      end

      def respond_to(*resources)
        respond_with(*resources)
      end

      def redirect_to(options = {}, response_status = {})
        #TODO
        #debugger
      end

      def after_inactive_sign_up_path_for(resource)
        302
      end

      def after_sign_up_path_for(resource)
        200
      end

      def after_update_path_for(resource)
        200
      end

      def after_resending_confirmation_instructions_path_for(resource_name)
        301
      end

      def after_sign_in_path_for(resource)
        200
      end

      def after_sign_out_path_for(resource)
        301
      end

    end
  end
end
