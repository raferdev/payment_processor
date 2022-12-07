Rails.application.routes.draw do
  get '/', to: 'application#getBlacklist'
  post '/', to: 'application#rules'
end