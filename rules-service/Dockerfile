FROM ruby:3.1.3
RUN apt-get update -qq && apt-get install -y nodejs 
RUN gem update --system

COPY . .
ENV INTERN_TOKEN=cloudwalk_pass
RUN bundle install
RUN rails db:migrate
RUN rails db:seed

CMD ["rails", "server","-b", "0.0.0.0"]