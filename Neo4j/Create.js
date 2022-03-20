const neo4j = require('neo4j-driver')

exports.handler = (event, context) => {
     const driver = neo4j.driver('', neo4j.auth.basic('neo4j', '1234'));
     const session = driver.session()
     var result = null
     
     //노드와 관계 다 생성
     if(event['relationnode'])
          result = session.run('CREATE (n:Person {name:$name, born:$born})-[:FEEL]->(m:Feeling {name:$relationnode}) RETURN n, m', 
                                                  {name: event['name'], born: neo4j.int(event['born']), relationnode: event['relationnode']})
     //노드만 생성
     else
          result = session.run('CREATE (a:Person {name: $name, born: $born}) RETURN a',
                                         {name: event['name'], born: neo4j.int(event['born'])})
     return result
}
