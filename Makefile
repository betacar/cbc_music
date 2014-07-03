
test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter spec \
		--harmony \
		--bail \
		test/**/*.js

.PHONY: test
