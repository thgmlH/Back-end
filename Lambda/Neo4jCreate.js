const neo4j = require('neo4j-driver');

exports.handler = function(event, context){
    const driver = neo4j.driver('neo4j://ip:port', neo4j.auth.basic('neo4j', 'password'));
    const session = driver.session();
    var count = null;
    var result;
    
    result = session.run('MATCH (n:Person{number: $number}) RETURN COUNT(n)', {number: event['number']})
          .then(result => {
            result.records.forEach(record => {
              count = record._fields[0].low

             //serial_number 1개 이상 있음 => 다른 속성 노드 有
             //serial_number 0개 => CREATE
              merge(count);   

            })
            return 'ok'
        })
          .catch(error => {
            //session.close()
            console.log(error)
        });
    
    function merge(count){
        if(count >= 1){
            console.log('1 이상')
           
            const query = "MATCH (a:Person {number: $number}) WHERE a.name <> $name " + 
                          "MERGE (n:Person {number: $number, name: $name}) ON CREATE SET n.inactive=0, n.sex = $sex, n.birth = $birth SET a.inactive=1 RETURN n";
            session.run(query, {number: event['number'], name: event['name'], sex: event['sex'], birth:event['birth']})
        }
        else{
            console.log('0')
            
            session.run('CREATE (a:Person {number: $number, name:$name, sex:$sex, birth:$birth}) RETURN a',
                                   {number: event['number'], name: event['name'], sex: event['sex'], birth:event['birth']})
        }
    }
     return result
}

