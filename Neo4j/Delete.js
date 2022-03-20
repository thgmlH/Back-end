const neo4j = require('neo4j-driver')

exports.handler = (event, context) => {
    const driver = neo4j.driver('', neo4j.auth.basic('neo4j', '1234'));
    const session = driver.session()
    var result = null
     
     //관계 삭제(relation값 필요)
    if(event['relationnode'] && !event['name']) {
        result = session.run('MATCH (n)-[r]->() WHERE r=$relationnode DELETE r', { relationnode: event['relationnode']})
        console.log("1")
    }    
    //노드+관계삭제(속성 값 필요)
    else if(!event['relationnode'] && event['name']) {
        result = session.run('MATCH (n:Person{name:$name}) DETACH DELETE n', { name: event['name']})
        console.log("2")
    }
    
    //특정 노드 찾아 관계삭제(속성 값 필요)
    else{
        result = session.run('MATCH (n:Person{name:$name})-[r]->(m) WHERE m.name=$relationnode DELETE r RETURN n', { name: event['name'], relationnode: event['relationnode']})
        console.log("3")
    }                                     
    return result
}
