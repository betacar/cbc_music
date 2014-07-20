load_env = @NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter spec \
		--harmony \
		--bail \

usage:
	@echo ''
	@echo 'Core tasks                       : Description'
	@echo '--------------------             : -----------'
	@echo 'make run                         : Run the API application'
	@echo 'make load                        : Loads users, follows and listen stub data to the endpoints'
	@echo 'make load-users                  : Loads users stub data to the endpoint'
	@echo 'make load-follows                : Loads user follows stub data to the endpoint'
	@echo 'make load-listen                 : Loads user listened music stub data to the endpoint'
	@echo ''
	@echo 'Tests tasks                      : Description'
	@echo '--------------------             : -----------'
	@echo 'make test                        : Run resource and model tests'
	@echo 'make test-resource               : Run endpoint resource tests'
	@echo 'make test-model                  : Run model tests'
	@echo ''

help: usage

test:
	$(call load_env) test/**/*.js

test-resource:
	$(call load_env) test/resources/*.js

test-model:
	$(call load_env) test/models/*.js

run:
	@bin/api

load-users:
	@node --harmony scripts/users.js

load-follows:
	@node --harmony scripts/follows.js

load-listen:
	@node --harmony scripts/listen.js

load: load-users load-follows load-listen

.PHONY: test test-resource test-models run load-users load-follows load-listen load
