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

.PHONY: test test-resource test-models
