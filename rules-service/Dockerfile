FROM ruby
RUN apt-get update -qq && apt-get install -y nodejs 
RUN gem update --system

COPY . .
RUN bundle install
RUN rails db:migrate
RUN rails db:seed

CMD ["rails", "server","-b", "0.0.0.0"]