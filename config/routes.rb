Interview::Application.routes.draw do

  devise_scope :user do
    get  '/me'                      => 'user/sessions#get_current_user'
    post '/sign_in(.:format)'       => 'user/sessions#create'
    delete '/sign_out(.:format)'    => 'user/sessions#destroy'

    post '/sign_up(.:format)'       => 'user/registrations#create'
    put  '/users(.:format)'         => 'user/registrations#update'

    get '/admin(.:format)'          => 'user/admins#show_all'
    get '/admin/:id'                => 'user/admins#show'
    delete '/admin/:id'             => 'user/admins#delete'
    put '/admin/:id'                => 'user/admins#update'

    post '/admin/inspect/:id'              => 'user/inspects#create'
    get '/admin/inspect/:id'               => 'user/inspects#show_all'
    get '/admin/inspect/:id/:inspectId'    => 'user/inspects#show'
    delete '/admin/inspect/:id/:inspectId' => 'user/inspects#delete'
    put '/admin/inspect/:id/:inspectId'    => 'user/inspects#edit'

    post '/admin/opinion/:id/:inspectId'              => 'user/opinions#create'
    get '/admin/opinion/:id/:inspectId'               => 'user/opinions#show_all'
    get '/admin/opinion/:id/:inspectId/:opinionId'    => 'user/opinions#show'
    delete '/admin/opinion/:id/:inspectId/:opinionId' => 'user/opinions#delete'
    put '/admin/opinion/:id/:inspectId/:opinionId'    => 'user/opinions#edit'
  end

  devise_for :users

  #resources :users

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
