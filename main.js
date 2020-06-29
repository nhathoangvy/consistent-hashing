const { HashRing, Consistent } = require("./consistent");

function main() {
    const consistent = new Consistent();

    consistent.addHost(new HashRing("192.168.1.0"));
    consistent.addHost(new HashRing("192.168.1.1"));
    
    consistent.add("foo");
    consistent.add("bar");

    console.log(consistent.nodes);
}

main();