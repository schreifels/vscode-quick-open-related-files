mkdir example-project
cd example-project

mkdir -p app/controllers
mkdir -p spec/controllers
mkdir -p app/views
mkdir -p spec/views
mkdir -p app/assets/javascripts/src
mkdir -p app/assets/javascripts/src-test

touch app/controllers/rocket_launch_controller.rb
touch spec/controllers/rocket_launch_controller_spec.rb
wget http://example.com -O app/views/rocket_launch.html.erb
touch spec/views/rocket_launch_spec.rb
touch app/assets/javascripts/src/rocket_launch.js
touch app/assets/javascripts/src-test/rocket_launch_test.js

code .
