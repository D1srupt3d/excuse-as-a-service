# security policy

## reporting a vulnerability

if you find a security issue, please report it responsibly:

1. open a private security advisory on github
2. or email directly (check profile for contact)

**do not** open public issues for security vulnerabilities

## response time

- initial response: within 48 hours
- fix timeline: depends on severity

## supported versions

currently supporting:

| version | supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

only the latest version receives security updates

## security considerations

this is a simple api service that:
- has rate limiting (120 req/min)
- serves static json data
- no user data storage
- no authentication required
- no database

main risks are dos/abuse which are mitigated by rate limiting

## dependencies

we use dependabot to keep dependencies up to date

run `npm audit` to check for known vulnerabilities
