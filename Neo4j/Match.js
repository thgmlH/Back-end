const neo4j = require('neo4j-driver')

exports.handler = (event, context) => {
     const driver = neo4j.driver('', neo4j.auth.basic('neo4j', '1234'));
     const session = driver.session()

     const result = session.run('MATCH (n) WHERE n.name=$name RETURN n', { name: event['name']})
     return result
}
