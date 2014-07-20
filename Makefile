load_env = @NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter spec \
		--harmony \
		--bail \

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
