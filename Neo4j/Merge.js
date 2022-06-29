const neo4j = require('neo4j-driver')

exports.handler = (event, context) => {
     const driver = neo4j.driver('', neo4j.auth.basic('neo4j', '1234'));
     const session = driver.session()
     //const session2 = driver.session()
     var result = null
     var count = null

     result = session.run('MATCH (n:Person{number: $number}) RETURN COUNT(n)', {number: event['number']})
     
     //result = result.records[0].get(0)

     const r = result.records(record=> record._fields[0].low)
     //number 1개 이상 있음 => 다른 속성 노드 有
     //number 0개 => CREATE
     
     if(count >= 1){
          result = session2.run('MATCH (a:Person {number: $number}) WHERE a.name <> $name MERGE (n:Person {number: $number, name: $name}) ON CREATE SET n.inactive=0, a.inactive = 1, n.sex = $sex RETURN n, a'
          , {number: event['number'], name: event['name'], sex: event['sex']})
          console.log('1 이상')
     }
     else{
          result = session2.run('CREATE (a:Person {number: $number, name:$name, sex:$sex}) RETURN a',
                                    {number: event['number'], name: event['name'], sex: event['sex']})
          console.log('0')
     }

     return result
}
